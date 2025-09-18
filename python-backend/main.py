from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bytomorrow.app", "https://www.bytomorrow.ap"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "message": "FastAPI backend running"}


@app.get("/api/visualize/data")
def get_data():
    return {
        "data": [
            {"params": "150M", "pile-valppl": 0.75},
            {"params": "10M", "pile-valppl": 0.82},
            {"params": "1B", "pile-valppl": 0.05},
        ],
        "type": "line",
    }
