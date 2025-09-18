import os
from datetime import datetime

import pandas as pd
import sh
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DF_1 = "initial_data/mean_eval_melted.parquet"
DF_2 = "initial_data/combined_plotting_data_matched.pkl"
# --------------- Setup Database ---------------
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

    class VisualizationCache(Base):
        __tablename__ = "visualization_cache"

        id = Column(Integer, primary_key=True, index=True)
        query_hash = Column(String(64), unique=True, index=True)
        data_json = Column(Text)
        created_at = Column(DateTime, default=datetime.utcnow)
else:
    print("DATABASE_URL not found, skipping db setup")


# Create tables
Base.metadata.create_all(bind=engine)

# --------------- Setup CORS ---------------
app = FastAPI()

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "https://bytomorrow.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# --------------- Setup API ---------------


@app.get("/api/health")
def health():
    return {"status": "ok", "message": "FastAPI backend running"}


@app.get("/api/visualize/data")
def get_data():
    try:
        print(">> Looking for the data")
        print(sh.ls())
        print(DF_1, os.path.exists(DF_1))
        print(DF_2, os.path.exists(DF_2))
        print(">> Load df 1")
        df_1 = pd.read_parquet(DF_1)
        df = df_1[df_1["params"].isin(["150M", "10M", "1B"])]
        df = df[df["data"] == "Dolma1.7"]
        df = df[df["metric" == "pile-valppl"]]
        df = df[df["step" == 5000]]
        chart_data = df.to_dict("records")
        return {
            "data": chart_data,
            "type": "line",
        }
    except (FileNotFoundError, ValueError, KeyError) as e:
        print(f"DataDecide error: {e}")
        return {
            "data": [
                {"params": "150M", "value": 0.75},
                {"params": "10M", "value": 0.82},
                {"params": "1B", "value": 0.05},
            ],
            "type": "line",
        }
