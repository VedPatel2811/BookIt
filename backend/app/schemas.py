from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date

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
    attachment_url: Optional[str] = None

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

class VisitorCreate(BaseModel):
    visitor_name: str
    contact_number: str
    reason: str
    expected_start_date: datetime
    expected_end_date: datetime

class VisitorResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    visitor_name: str
    contact_number: str
    reason: str
    expected_start_date: datetime
    expected_end_date: datetime
    status: str
    created_at: datetime
    checked_in_at: Optional[datetime] = None
    checked_out_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class VisitorStats(BaseModel):
    expected_today: int
    in_premises: int
    total_monthly: int

# ── Facility ──────────────────────────────────────────────────────────────────

class FacilityResponse(BaseModel):
    id: int
    title: str
    description: str
    maxTimePerSession: str
    maxSessionsPerDay: int
    imageUrl: str
    badge: Optional[str] = None
    spanClasses: str

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, obj):
        return cls(
            id=obj.id,
            title=obj.title,
            description=obj.description,
            maxTimePerSession=obj.max_time_per_session,
            maxSessionsPerDay=obj.max_sessions_per_day,
            imageUrl=obj.image_url,
            badge=obj.badge,
            spanClasses=obj.span_classes,
        )

# ── Facility Booking ──────────────────────────────────────────────────────────

class BookingCreate(BaseModel):
    facility_id: int
    booking_date: date
    slot_time: str
    booker_name: str
    confirmation_email: EmailStr

class BookingResponse(BaseModel):
    id: int
    facility_id: int
    facility_title: str
    facility_image_url: str
    user_id: int
    booking_date: date
    slot_time: str
    booker_name: str
    confirmation_email: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class SlotStatusResponse(BaseModel):
    booked: List[str]   # slot_time strings that are confirmed booked
    locked: List[str]   # slot_time strings currently locked by another user
