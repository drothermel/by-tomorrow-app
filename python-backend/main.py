import os
from datetime import datetime

import pandas as pd
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


@app.get("/api/visualize/data/ft")
def get_data_ft():
    try:
        print(">> Loading the combined pickle file")
        df = pd.read_pickle(DF_2)
        df["timestamp"] = df["timestamp"].dt.strftime("%Y-%m-%d %H:%M:%S")
        chart_data = df.to_dict("records")
        print(">> Converted the df to dict:", len(chart_data))
        return {
            "data": chart_data,
        }
    except Exception as e:
        print("Error loading df 1")
        print(e)
        return {
            "data": [
                {"params": "60M", "value": 0.75},
                {"params": "60M", "value": 0.82},
                {"params": "60M", "value": 0.05},
            ],
        }


@app.get("/api/visualize/data/60M_pile")
def get_data_60M_pile():
    try:
        print(">> Loading the mean_eval melted parquet file")
        df = pd.read_parquet(DF_1)
        print(">> Filtering the df")
        df = df[df["params"].isin(["60M"])]
        df = df[df["metric"] == "pile-valppl"]
        print(">> Converting to records and returning")
        chart_data = df.to_dict("records")
        print(">> Converted the df to dict:", len(chart_data))
        return {
            "data": chart_data,
        }
    except Exception as e:
        print("Error loading df 1")
        print(e)
        return {
            "data": [
                {"params": "60M", "value": 0.75},
                {"params": "60M", "value": 0.82},
                {"params": "60M", "value": 0.05},
            ],
        }


@app.get("/api/visualize/data")
def get_data():
    try:
        print(">> Loading the mean_eval melted parquet file")
        df = pd.read_parquet(DF_1)
        chart_data = df.to_dict("records")
        print(">> Converted the df to dict:", len(chart_data))
        return {
            "data": chart_data,
        }
    except Exception as e:
        print("Error loading df 1")
        print(e)
        return {
            "data": [
                {"params": "150M", "value": 0.75},
                {"params": "10M", "value": 0.82},
                {"params": "1B", "value": 0.05},
            ],
            "type": "line",
        }
