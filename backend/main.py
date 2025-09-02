from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseSettings
import os

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://metiers.thalasso.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Settings(BaseSettings):
    mews_client_token: str
    mews_access_token: str
    mews_client: str
    database_url: str

    class Config:
        env_file = "../coolify/coolify.env"

settings = Settings()





@app.get("/")
def read_root():
    return {"message": "Backend pour la gestion des réservations"}


@app.get("/health")  # <-- Ajoutez cette route
def health_check():
    return {"status": "healthy"}


@app.get("/reservations/{meal_type}")
def get_reservations(meal_type: str):
    # Exemple : Récupérer les réservations depuis Mews ou la base de données
    return {"meal_type": meal_type, "count": 0}
