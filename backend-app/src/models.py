from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_number = Column(String(50), nullable=False)
    vehicle_letter = Column(String(10), nullable=False)
    province = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    chassis_number = Column(String(100), unique=True, nullable=False)
    importer_name = Column(String(200), nullable=True)
    importer_phone = Column(String(50), nullable=True)
    buyer_name = Column(String(200), nullable=True)
    buyer_phone = Column(String(50), nullable=True)
    work_location = Column(String(200), nullable=True)
    amount = Column(Float, nullable=True)
    paid_amount = Column(Float, nullable=True)
    remaining_amount = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)