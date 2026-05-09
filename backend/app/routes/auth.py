from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import os
import secrets
import string

from app import models, schemas, utils
from app.database import get_db
from app.deps import get_current_user, oauth2_scheme
from app.redis_client import redis_client

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    generated_password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(12))
    hashed_password = utils.get_password_hash(generated_password)
    new_org_id = utils.generate_organization_id(user.organization_name)
    
    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        organization_id=new_org_id,
        organization_name=user.organization_name,
        organization_address=user.organization_address,
        contact_number=user.contact_number
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    response = schemas.UserResponse.model_validate(new_user)
    response.generated_password = generated_password
    return response

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme), current_user: models.User = Depends(get_current_user)):
    # Blacklist the token in Redis to expire at the same time as the token itself
    if redis_client:
        # Simplification: just storing it for 30 minutes in redis as blacklisted
        redis_client.setex(f"blacklist:{token}", ACCESS_TOKEN_EXPIRE_MINUTES * 60, "true")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
