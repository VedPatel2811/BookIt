from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from app.database import get_db
from app.models import Visitor
from app.schemas import VisitorResponse, VisitorCreate, VisitorStats

router = APIRouter(prefix="/visitors", tags=["Visitors"])

def seed_data(db: Session):
    existing = db.query(Visitor).count()
    if existing == 0:
        v1 = Visitor(
            visitor_name="Sanjay Gupta",
            contact_number="+91 9876543210",
            reason="Guest",
            expected_start_date=datetime.utcnow() + timedelta(hours=2),
            expected_end_date=datetime.utcnow() + timedelta(hours=4),
            status="EXPECTED"
        )
        v2 = Visitor(
            visitor_name="Amazon Delivery",
            contact_number="+91 9123456789",
            reason="Delivery",
            expected_start_date=datetime.utcnow() - timedelta(minutes=30),
            expected_end_date=datetime.utcnow() + timedelta(minutes=30),
            status="IN_PREMISES",
            checked_in_at=datetime.utcnow() - timedelta(minutes=25)
        )
        v3 = Visitor(
            visitor_name="Neha Sharma",
            contact_number="+91 9988776655",
            reason="Maintenance",
            expected_start_date=datetime.utcnow() - timedelta(hours=3),
            expected_end_date=datetime.utcnow() - timedelta(hours=1),
            status="CHECKED_OUT",
            checked_in_at=datetime.utcnow() - timedelta(hours=2, minutes=50),
            checked_out_at=datetime.utcnow() - timedelta(hours=1)
        )
        db.add_all([v1, v2, v3])
        db.commit()

@router.get("/stats", response_model=VisitorStats)
def get_visitor_stats(db: Session = Depends(get_db)):
    seed_data(db)
    
    expected_today = db.query(Visitor).filter(Visitor.status == "EXPECTED").count()
    in_premises = db.query(Visitor).filter(Visitor.status == "IN_PREMISES").count()
    
    return VisitorStats(
        expected_today=expected_today,
        in_premises=in_premises,
        total_monthly=124
    )

@router.get("", response_model=List[VisitorResponse])
def get_visitors(db: Session = Depends(get_db)):
    seed_data(db)
    return db.query(Visitor).order_by(Visitor.created_at.desc()).all()

@router.post("", response_model=VisitorResponse)
def create_visitor(visitor: VisitorCreate, db: Session = Depends(get_db)):
    new_visitor = Visitor(
        **visitor.dict(),
        status="EXPECTED"
    )
    db.add(new_visitor)
    db.commit()
    db.refresh(new_visitor)
    return new_visitor
