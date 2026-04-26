from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    vendor = Column(String, nullable=True)
    unit_name = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING")
    transaction_type = Column(String, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    subject = Column(String, nullable=False)
    category = Column(String, nullable=False)
    urgency = Column(String, nullable=False, default="LOW")
    description = Column(String, nullable=False)
    status = Column(String, nullable=False, default="IN_PROGRESS")
    assigned_to = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    admin_comment = Column(String, nullable=True)
    attachment_url = Column(String, nullable=True)

    user = relationship("User")

class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    visitor_name = Column(String, nullable=False)
    contact_number = Column(String, nullable=False)
    reason = Column(String, nullable=False, default="Guest")
    expected_start_date = Column(DateTime(timezone=True), nullable=False)
    expected_end_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, nullable=False, default="EXPECTED") # EXPECTED, IN_PREMISES, CHECKED_OUT
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    checked_in_at = Column(DateTime(timezone=True), nullable=True)
    checked_out_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User")
