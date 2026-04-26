from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.database import get_db
from app.deps import get_current_user
from app import models, schemas

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.get("/my", response_model=List[schemas.BookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    bookings = (
        db.query(models.FacilityBooking)
        .options(joinedload(models.FacilityBooking.facility))
        .filter(
            models.FacilityBooking.user_id == current_user.id,
            models.FacilityBooking.status == "CONFIRMED",
        )
        .order_by(models.FacilityBooking.booking_date.desc(), models.FacilityBooking.slot_time.desc())
        .all()
    )

    return [
        schemas.BookingResponse(
            id=b.id,
            facility_id=b.facility_id,
            facility_title=b.facility.title,
            facility_image_url=b.facility.image_url,
            user_id=b.user_id,
            booking_date=b.booking_date,
            slot_time=b.slot_time,
            booker_name=b.booker_name,
            confirmation_email=b.confirmation_email,
            status=b.status,
            created_at=b.created_at,
        )
        for b in bookings
    ]
