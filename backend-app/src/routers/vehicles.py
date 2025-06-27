from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi.responses import RedirectResponse

from .. import crud, models, schemas
from ..database import get_db
from ..auth_utils import get_current_user  # ✅ حماية المسارات

router = APIRouter(
    prefix="/vehicles",
    tags=["vehicles"],
    responses={404: {"description": "Not found"}},
)

# Helper function to calculate remaining amount
def calculate_remaining(vehicle: models.Vehicle) -> Optional[float]:
    if vehicle.amount is not None and vehicle.paid_amount is not None:
        return vehicle.amount - vehicle.paid_amount
    return None

@router.post("/", response_model=schemas.Vehicle, status_code=status.HTTP_201_CREATED)
def create_vehicle_endpoint(
    vehicle: schemas.VehicleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),  # ✅ التحقق من التوكن
):
    db_vehicle_by_chassis = crud.get_vehicle_by_chassis(db, chassis_number=vehicle.chassis_number)
    if db_vehicle_by_chassis:
        raise HTTPException(status_code=400, detail="Chassis number already registered")
    created_vehicle = crud.create_vehicle(db=db, vehicle=vehicle)
    created_vehicle.remaining_amount = calculate_remaining(created_vehicle)
    return created_vehicle

@router.get("/", response_model=List[schemas.Vehicle])
def read_vehicles_endpoint(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),  # ✅ التحقق من التوكن
):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    for v in vehicles:
        v.remaining_amount = calculate_remaining(v)
    return vehicles

@router.get("/{vehicle_id}", response_model=schemas.Vehicle)
def read_vehicle_endpoint(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),  # ✅ التحقق من التوكن
):
    db_vehicle = crud.get_vehicle(db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db_vehicle.remaining_amount = calculate_remaining(db_vehicle)
    return db_vehicle

@router.put("/{vehicle_id}", response_model=schemas.Vehicle)
def update_vehicle_endpoint(
    vehicle_id: int,
    vehicle: schemas.VehicleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),  # ✅ التحقق من التوكن
):
    if vehicle.chassis_number:
        existing_vehicle = crud.get_vehicle_by_chassis(db, chassis_number=vehicle.chassis_number)
        if existing_vehicle and existing_vehicle.id != vehicle_id:
            raise HTTPException(status_code=400, detail="Chassis number already registered to another vehicle")

    db_vehicle = crud.update_vehicle(db, vehicle_id=vehicle_id, vehicle=vehicle)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db_vehicle.remaining_amount = calculate_remaining(db_vehicle)
    return db_vehicle

@router.delete("/{vehicle_id}", response_model=schemas.Vehicle)
def delete_vehicle_endpoint(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),  # ✅ التحقق من التوكن
):
    db_vehicle = crud.delete_vehicle(db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

# ✅ حل إعادة التوجيه من /vehicles إلى /vehicles/ دون فقدان التوكن
@router.get("", include_in_schema=False)
async def redirect_without_slash():
    return RedirectResponse(url="/vehicles/", status_code=308)
