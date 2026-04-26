from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date as date_type

from app.database import get_db
from app.deps import get_current_user
from app import models, schemas
from app.redis_client import redis_client

router = APIRouter(prefix="/facilities", tags=["Facilities"])

LOCK_TTL_SECONDS = 15 * 60  # 15 minutes


def _lock_key(facility_id: int, booking_date: str, slot_time: str) -> str:
    return f"slot_lock:{facility_id}:{booking_date}:{slot_time}"


def seed_facilities(db: Session):
    if db.query(models.Facility).count() == 0:
        facilities = [
            models.Facility(
                title="Cricket Nets",
                description="Professional grade practice turfs with automated bowling machines and HD analysis cameras.",
                max_time_per_session="1 hour",
                max_sessions_per_day=2,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuCAQwtsi3TLhJAoE6tyM6ZuASIUt--RRQWP61kLfq-LmwPDDRn-VetdmiCkrs-dY10_1amRGahHTlqBGWa60wNL2nA3gK18eud9uFYixFt9IuyBH_q9q1CkaXc7oz0JZsVTJaGqec6UnQ5-1Qr3ONDgr75zwG8tobwrbUBgxua6Emuptl2J54l6k_oDBZRb8qXyLM0zZokWuWgoTgsjlCwAFlBC6iOTNzNTz9kd03jbhslZYTQjXi33uKAj5msh7K4MqVaHMmjShg",
                badge="Verified",
                span_classes="col-span-12 lg:col-span-7",
            ),
            models.Facility(
                title="Elite Gymnasium",
                description="Equipped with the latest TechnoGym series and certified personal trainers on demand.",
                max_time_per_session="2 hours",
                max_sessions_per_day=1,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuD9kAs4yJUJg2EYdVL-fwJF7hPF1SUxdZdWKAA3Fmlz1Bf4oS_GJr0WeueK8AVJ-Jy5ZudxwD3plI2efoB5V3oYVJdC8t-iHySwcUN-vLK431NlEM0UtR3Inx9XQVq0JbBIezGLhbn_zp-Ic861HsqCm6aoN_KJdr3axeSgfuSuxrRgqsM8PbRgjWwMKpKxiQcm1itO5b2gIQuE697ddpuWUNhqm1j7QGsPty0AgjgQbN4ex59KBVb9YA46HBd9TPADo2furSmOhw",
                badge=None,
                span_classes="col-span-12 lg:col-span-5",
            ),
            models.Facility(
                title="Infinity Pool",
                description="Temperature controlled Olympic-sized pool with private cabanas.",
                max_time_per_session="90 mins",
                max_sessions_per_day=1,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuDBQZhAgLPwyFSSYgF6UJ0dTj2jcoyi_WkbutzbaHu8fDliwYBvpZa0jbGfieBgVY23HOiEeLYhZmGlbGJTF9tcQCcRV84Jc4xrOvFu0BX8tqIc7KKyE2Xmw9GrFIbrEseobfznOY_Zvn4OgtXpr2dVqJ6e16a2iND4Z2UqkY40LJ2dRha5GB5nfLXB4Kz9h1PGMqutRy5ngPoMEmo2TpKeFSL4hw99F8pBppmSDnsNtyEa9FzT-gjjpSEQbEfbBMPbieLN_g4-xA",
                badge="Popular",
                span_classes="col-span-12 lg:col-span-6",
            ),
            models.Facility(
                title="Mini Theater",
                description="16-seater 4K Dolby Atmos cinema for private screenings and sports events.",
                max_time_per_session="3 hours",
                max_sessions_per_day=1,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuCNwJ34qsX0os7lEpDRnvpwKiMqzPchDPq3tu0LqBSrxiWruMQgQ-0JEjhD2NvfOYm7-TqKr148bvFlHC4TQ2MXZlpXF6IbCvYNXicxczAWdD-ZDO62YrPDij9UGVcbfrbrRKMKzR16x0fu50lh4OSYnY_af_pFKIkNOL8DzH8srB3bVPwkiWduhfYWCGp058RGj3v5eskv-bXl5RKxJgityeipqmGK_gt9WJzOSg65xbMySWp2RVBQLlSQuLN6L5fxLrpsIN7h7A",
                badge=None,
                span_classes="col-span-12 lg:col-span-6",
            ),
        ]
        db.add_all(facilities)
        db.commit()


@router.get("", response_model=List[schemas.FacilityResponse])
def get_facilities(db: Session = Depends(get_db)):
    seed_facilities(db)
    facilities = db.query(models.Facility).filter(models.Facility.is_active == True).all()
    return [schemas.FacilityResponse.from_orm(f) for f in facilities]


@router.get("/{facility_id}/slots", response_model=schemas.SlotStatusResponse)
def get_slot_status(
    facility_id: int,
    booking_date: date_type,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Confirmed bookings from DB
    booked = [
        b.slot_time
        for b in db.query(models.FacilityBooking).filter(
            models.FacilityBooking.facility_id == facility_id,
            models.FacilityBooking.booking_date == booking_date,
            models.FacilityBooking.status == "CONFIRMED",
        ).all()
    ]

    # Locked slots from Redis (exclude locks held by the current user)
    locked = []
    if redis_client:
        pattern = f"slot_lock:{facility_id}:{booking_date}:*"
        for key in redis_client.scan_iter(pattern):
            lock_owner = redis_client.get(key)
            slot_time = key.split(":")[-1]
            # Only surface as locked if owned by someone else
            if lock_owner and lock_owner != str(current_user.id):
                locked.append(slot_time)

    return schemas.SlotStatusResponse(booked=booked, locked=locked)


@router.post("/{facility_id}/slots/{slot_time}/lock", status_code=status.HTTP_200_OK)
def acquire_lock(
    facility_id: int,
    slot_time: str,
    booking_date: date_type,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Check if already confirmed booked
    existing = db.query(models.FacilityBooking).filter(
        models.FacilityBooking.facility_id == facility_id,
        models.FacilityBooking.booking_date == booking_date,
        models.FacilityBooking.slot_time == slot_time,
        models.FacilityBooking.status == "CONFIRMED",
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Slot is already booked")

    if not redis_client:
        return {"locked": True}

    key = _lock_key(facility_id, str(booking_date), slot_time)
    current_lock = redis_client.get(key)

    if current_lock and current_lock != str(current_user.id):
        raise HTTPException(status_code=409, detail="Slot is currently being booked by another user")

    # Set or refresh the lock
    redis_client.setex(key, LOCK_TTL_SECONDS, str(current_user.id))
    return {"locked": True}


@router.delete("/{facility_id}/slots/{slot_time}/lock", status_code=status.HTTP_200_OK)
def release_lock(
    facility_id: int,
    slot_time: str,
    booking_date: date_type,
    current_user: models.User = Depends(get_current_user),
):
    if redis_client:
        key = _lock_key(facility_id, str(booking_date), slot_time)
        lock_owner = redis_client.get(key)
        if lock_owner == str(current_user.id):
            redis_client.delete(key)
    return {"released": True}


@router.post("/book", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: schemas.BookingCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    facility = db.query(models.Facility).filter(models.Facility.id == payload.facility_id).first()
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")

    # Check daily booking limit for this user on this facility
    user_bookings_today = db.query(models.FacilityBooking).filter(
        models.FacilityBooking.facility_id == payload.facility_id,
        models.FacilityBooking.user_id == current_user.id,
        models.FacilityBooking.booking_date == payload.booking_date,
        models.FacilityBooking.status == "CONFIRMED",
    ).count()

    if user_bookings_today >= facility.max_sessions_per_day:
        raise HTTPException(
            status_code=409,
            detail=f"You have reached the daily booking limit ({facility.max_sessions_per_day} session(s)) for this facility",
        )

    # Check slot is not already booked by someone else
    slot_taken = db.query(models.FacilityBooking).filter(
        models.FacilityBooking.facility_id == payload.facility_id,
        models.FacilityBooking.booking_date == payload.booking_date,
        models.FacilityBooking.slot_time == payload.slot_time,
        models.FacilityBooking.status == "CONFIRMED",
    ).first()
    if slot_taken:
        raise HTTPException(status_code=409, detail="Slot is already booked")

    # Verify the Redis lock belongs to this user
    if redis_client:
        key = _lock_key(payload.facility_id, str(payload.booking_date), payload.slot_time)
        lock_owner = redis_client.get(key)
        if lock_owner and lock_owner != str(current_user.id):
            raise HTTPException(status_code=409, detail="Slot is currently being booked by another user")

    # Create booking
    booking = models.FacilityBooking(
        facility_id=payload.facility_id,
        user_id=current_user.id,
        booking_date=payload.booking_date,
        slot_time=payload.slot_time,
        booker_name=payload.booker_name,
        confirmation_email=str(payload.confirmation_email),
        status="CONFIRMED",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    # Release the Redis lock after successful booking
    if redis_client:
        key = _lock_key(payload.facility_id, str(payload.booking_date), payload.slot_time)
        redis_client.delete(key)

    return schemas.BookingResponse(
        id=booking.id,
        facility_id=booking.facility_id,
        facility_title=facility.title,
        facility_image_url=facility.image_url,
        user_id=booking.user_id,
        booking_date=booking.booking_date,
        slot_time=booking.slot_time,
        booker_name=booking.booker_name,
        confirmation_email=booking.confirmation_email,
        status=booking.status,
        created_at=booking.created_at,
    )
