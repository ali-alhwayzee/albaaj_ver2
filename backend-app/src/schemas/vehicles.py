# src/schemas/vehicles.py

from pydantic import BaseModel
from typing import Optional

class VehicleBase(BaseModel):
    vehicle_number: str
    vehicle_letter: str
    province: str
    category: str
    chassis_number: str
    amount: Optional[float] = None
    paid_amount: Optional[float] = None
    importer_name: Optional[str] = None
    importer_phone: Optional[str] = None
    buyer_name: Optional[str] = None
    buyer_phone: Optional[str] = None
    work_location: Optional[str] = None
    notes: Optional[str] = None

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    vehicle_number: Optional[str]
    vehicle_letter: Optional[str]
    province: Optional[str]
    category: Optional[str]
    chassis_number: Optional[str]
    amount: Optional[float]
    paid_amount: Optional[float]
    importer_name: Optional[str]
    importer_phone: Optional[str]
    buyer_name: Optional[str]
    buyer_phone: Optional[str]
    work_location: Optional[str]
    notes: Optional[str]

class Vehicle(VehicleBase):
    id: int
    remaining_amount: Optional[float]

    class Config:
        orm_mode = True
