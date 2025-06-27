# ==== Standard Libraries ====
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ==== App Configuration ====
from . import models
from .database import engine
from .routers import vehicles
from .auth import router as auth_router

# ✅ إعداد قاعدة البيانات
models.Base.metadata.create_all(bind=engine)

# ✅ إنشاء تطبيق FastAPI
app = FastAPI(
    title="Albaaj Backend API",
    description="API for the Albaaj application, managing vehicle data.",
    version="0.1.0",
)

# ✅ إعداد CORS Middleware بشكل صحيح
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",  # يسمح لكل origins — اختياري يمكن تقييده
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ مسار تجريبي
@app.get("/")
def read_root():
    return {"message": "Welcome to the Albaaj Vehicle Management Backend API"}

# ✅ تضمين الراوترات بعد إعداد CORS
app.include_router(auth_router)
app.include_router(vehicles.router)
