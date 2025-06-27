# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY ./src /app/src
COPY .env.example /app/.env.example

# ✅ Copy wait-for-it script and make it executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the port the app runs on
EXPOSE 8000

# ✅ Wait for DB then run FastAPI
CMD ["/wait-for-it.sh", "db:5432", "--", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
