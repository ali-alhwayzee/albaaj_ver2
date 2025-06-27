# src/config.py

from dotenv import load_dotenv
from pathlib import Path
import os

# ✅ تحميل ملف .env من مجلد المشروع الجذري تلقائياً
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

# ✅ تعريف المتغيرات البيئية المطلوبة
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
POSTGRES_USER = os.getenv("POSTGRES_USER", "albaajuser")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "albaajpassword")
POSTGRES_DB = os.getenv("POSTGRES_DB", "albaajdb")

# ✅ اختياري: طباعة لتأكيد تحميل المفتاح
print("📌 Loaded SECRET_KEY =", SECRET_KEY)
