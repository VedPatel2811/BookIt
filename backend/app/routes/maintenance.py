from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.models import Transaction, User
from app.schemas import TransactionResponse, MaintenanceStats
from app.deps import get_current_user

router = APIRouter()

def seed_db_if_empty(db: Session, user: User):
    # Check if there are any transactions
    count = db.query(Transaction).count()
    if count == 0:
        txs = [
            Transaction(
                user_id=None,
                title="Elevator Repair (Block C)",
                vendor="Otis Elevators",
                unit_name="Society",
                amount=45000.0,
                status="COMPLETED",
                transaction_type="EXPENDITURE"
            ),
            Transaction(
                user_id=user.id,
                title="Garden Upkeep & Landscaping",
                vendor="GreenLeaf Co.",
                unit_name="Society",
                amount=12000.0,
                status="COMPLETED",
                transaction_type="EXPENDITURE"
            ),
            Transaction(
                user_id=user.id,
                title="Aditya Sharma",
                vendor=None,
                unit_name="Unit C-1402",
                amount=12450.0,
                status="PENDING",
                transaction_type="MAINTENANCE"
            ),
            Transaction(
                user_id=None,
                title="Ananya Iyer",
                vendor=None,
                unit_name="Unit A-2101",
                amount=12450.0,
                status="COMPLETED",
                transaction_type="MAINTENANCE"
            )
        ]
        db.add_all(txs)
        db.commit()

@router.get("/stats", response_model=MaintenanceStats)
def get_maintenance_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    seed_db_if_empty(db, current_user)
    
    return MaintenanceStats(
        pending_maintenance=12450.0,
        total_society_collection=1480000.0,
        pending_units=18,
        total_units=420
    )

@router.get("/transactions", response_model=List[TransactionResponse])
def get_recent_transactions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    seed_db_if_empty(db, current_user)
    transactions = db.query(Transaction).order_by(Transaction.id.desc()).limit(15).all()
    return transactions
