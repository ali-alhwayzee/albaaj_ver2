from sqlalchemy.orm import Session
from . import models, schemas

def get_vehicle(db: Session, vehicle_id: int):
    return db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()

def get_vehicle_by_chassis(db: Session, chassis_number: str):
    return db.query(models.Vehicle).filter(models.Vehicle.chassis_number == chassis_number).first()

def get_vehicles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Vehicle).offset(skip).limit(limit).all()

def create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    db_vehicle = models.Vehicle(**vehicle.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def update_vehicle(db: Session, vehicle_id: int, vehicle: schemas.VehicleUpdate):
    db_vehicle = get_vehicle(db, vehicle_id)
    if db_vehicle:
        update_data = vehicle.model_dump(exclude_unset=True) # Pydantic v2
        for key, value in update_data.items():
            setattr(db_vehicle, key, value)
        db.commit()
        db.refresh(db_vehicle)
    return db_vehicle

def delete_vehicle(db: Session, vehicle_id: int):
    db_vehicle = get_vehicle(db, vehicle_id)
    if db_vehicle:
        db.delete(db_vehicle)
        db.commit()
    return db_vehicle

# Remove or comment out old Item CRUD functions
# def get_item(db: Session, item_id: int): ...
# def get_items(db: Session, skip: int = 0, limit: int = 100): ...
# def create_item(db: Session, item: schemas.ItemCreate): ...
# def update_item(db: Session, item_id: int, item: schemas.ItemUpdate): ...
# def delete_item(db: Session, item_id: int): ...

