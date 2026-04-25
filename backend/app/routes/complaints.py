from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from app.database import get_db
from app.models import Complaint
from app.schemas import ComplaintResponse, ComplaintCreate, ComplaintStats

router = APIRouter(prefix="/complaints", tags=["Complaints"])

def seed_data(db: Session):
    existing = db.query(Complaint).count()
    if existing == 0:
        c1 = Complaint(
            subject="Master Bathroom Leakage",
            category="Plumbing & Water",
            urgency="Urgent",
            description="Water leaking from the ceiling in the master bathroom.",
            status="IN_PROGRESS",
            assigned_to="Rahul M.",
            created_at=datetime.utcnow() - timedelta(days=1),
            admin_comment="We have dispatched a plumber to address this immediately.",
            attachment_url="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300"
        )
        c2 = Complaint(
            subject="Main Panel Fluctuations",
            category="Electrical Systems",
            urgency="Low",
            description="Power tripping intermittently.",
            status="COMPLETED",
            assigned_to="System",
            created_at=datetime.utcnow() - timedelta(days=5),
            resolved_at=datetime.utcnow() - timedelta(days=4),
            admin_comment="Main breaker replaced. The system is operating nominally."
        )
        c3 = Complaint(
            subject="Keyless Entry Calibration",
            category="Security & Access",
            urgency="Urgent",
            description="Door code not matching app. Requires Re-entry.",
            status="OPEN",
            assigned_to="Security",
            created_at=datetime.utcnow() - timedelta(days=7)
        )
        db.add_all([c1, c2, c3])
        db.commit()

@router.get("/stats", response_model=ComplaintStats)
def get_complaint_stats(db: Session = Depends(get_db)):
    seed_data(db)
    
    active_tickets = db.query(Complaint).filter(Complaint.status != "COMPLETED").count()
    
    return ComplaintStats(
        avg_resolution_hours=4.2,
        resident_satisfaction=98,
        active_tickets=active_tickets,
        premium_tier="Platinum Tier"
    )

@router.get("", response_model=List[ComplaintResponse])
def get_complaints(db: Session = Depends(get_db)):
    seed_data(db)
    return db.query(Complaint).order_by(Complaint.created_at.desc()).all()

@router.post("", response_model=ComplaintResponse)
def create_complaint(complaint: ComplaintCreate, db: Session = Depends(get_db)):
    new_complaint = Complaint(
        **complaint.dict(),
        status="OPEN"
    )
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    return new_complaint
