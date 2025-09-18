import os
from datetime import datetime

from datadec import DataDecide
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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
        print("Start setting up DataDecide")
        dd = DataDecide(data_dir="./data")
        print("Finished setting up DataDecide")
        df = dd.easy_index_df(
            df_name="full_eval",
            data="Dolma1.7",
            params=["10M", "150M", "1B"],  # Sample model sizes
            seed=0,
        )
        chart_data = df.to_dict("records")
        return {
            "data": chart_data,
            "type": "line",
        }
    except (FileNotFoundError, ValueError, KeyError) as e:
        print(f"DataDecide error: {e}")
        return {
            "data": [
                {"params": "150M", "pile-valppl": 0.75},
                {"params": "10M", "pile-valppl": 0.82},
                {"params": "1B", "pile-valppl": 0.05},
            ],
            "type": "line",
        }
