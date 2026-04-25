from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class TransactionResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    title: str
    vendor: Optional[str] = None
    unit_name: Optional[str] = None
    amount: float
    status: str
    transaction_type: str
    date: datetime

    class Config:
        from_attributes = True

class MaintenanceStats(BaseModel):
    pending_maintenance: float
    total_society_collection: float
    pending_units: int
    total_units: int

class ComplaintCreate(BaseModel):
    subject: str
    category: str
    urgency: str
    description: str

class ComplaintResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    subject: str
    category: str
    urgency: str
    description: str
    status: str
    assigned_to: Optional[str] = None
    created_at: datetime
    resolved_at: Optional[datetime] = None
    admin_comment: Optional[str] = None
    attachment_url: Optional[str] = None

    class Config:
        from_attributes = True

class ComplaintStats(BaseModel):
    avg_resolution_hours: float
    resident_satisfaction: int
    active_tickets: int
    premium_tier: str
