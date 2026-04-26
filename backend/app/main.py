from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, maintenance, complaints, visitors

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BookIt API")

import os

# Configure CORS so the frontend can communicate with the backend
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "")
origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(maintenance.router, prefix="/maintenance", tags=["Maintenance"])
app.include_router(complaints.router)
app.include_router(visitors.router)
@app.get("/")
def read_root():
    return {"message": "Welcome to BookIt Backend API"}
