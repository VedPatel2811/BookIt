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
