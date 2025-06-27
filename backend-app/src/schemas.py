from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

# Enum لتعريف أنواع المركبات
class VehicleCategory(str, Enum):
    private = "private"
    truck = "truck"
    taxi = "taxi"

# Base schema for common fields
class VehicleBase(BaseModel):
    vehicle_number: str = Field(..., description="Vehicle registration number")
    vehicle_letter: str = Field(..., max_length=1, description="Single letter from registration")
    province: str = Field(..., description="Iraqi province name")
    category: VehicleCategory = Field(..., description="Vehicle category (private, truck, taxi)")
    chassis_number: str = Field(..., description="Vehicle Chassis Number (VIN)")
    importer_name: Optional[str] = None
    importer_phone: Optional[str] = None
    buyer_name: Optional[str] = None
    buyer_phone: Optional[str] = None
    work_location: Optional[str] = None
    amount: Optional[float] = None
    paid_amount: Optional[float] = None
    notes: Optional[str] = None

# Schema for creating a new vehicle (inherits from Base)
class VehicleCreate(VehicleBase):
    pass

# Schema for updating an existing vehicle (all fields optional)
class VehicleUpdate(BaseModel):
    vehicle_number: Optional[str] = None
    vehicle_letter: Optional[str] = Field(None, max_length=1)
    province: Optional[str] = None
    category: Optional[VehicleCategory] = None
    chassis_number: Optional[str] = None  # Usually not updatable, but included for flexibility
    importer_name: Optional[str] = None
    importer_phone: Optional[str] = None
    buyer_name: Optional[str] = None
    buyer_phone: Optional[str] = None
    work_location: Optional[str] = None
    amount: Optional[float] = None
    paid_amount: Optional[float] = None
    notes: Optional[str] = None

# Schema for reading/returning vehicle data (includes ID and calculated remaining amount)
class Vehicle(VehicleBase):
    id: int
    remaining_amount: Optional[float] = None  # Calculated field

    class Config:
        from_attributes = True  # Pydantic v2

# Schema for users
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
