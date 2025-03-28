from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import os
import base64
import uvicorn
import math
from datetime import datetime
import logging
from typing import List
import httpx

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB Connection
try:
    MONGO_DB_URL = os.environ.get(
        "MONGO_DB_URL",
        "mongodb+srv://mehtavansh13042005:u7Tv8ENi22n0mK7W@techverse.ntbynet.mongodb.net/?retryWrites=true&w=majority&appName=TechVerse"
    )
    client = MongoClient(MONGO_DB_URL)
    db_attendance = client["attendance_records"]
    attendance_collection = db_attendance["records"]
    db_photos = client["Classroom_photos"]
    photos_collection = db_photos["images"]
except Exception as e:
    logger.error(f"MongoDB Connection Error: {e}")
    raise

# Create FastAPI app
app = FastAPI(title="Unified API for Attendance and Classroom Photos")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",  # React default dev server
        "http://localhost:8000",  # Backend server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_value(value):
    """
    Clean values to ensure they are JSON compliant
    """
    if isinstance(value, float):
        if math.isnan(value) or math.isinf(value):
            return None
    return value

@app.get("/get-attendance")
def get_attendance():
    """
    Fetches all attendance records from MongoDB and returns them as a list.
    """
    try:
        records = list(attendance_collection.find())
        cleaned_records = []
        for record in records:
            record['_id'] = str(record['_id'])
            cleaned_record = {k: clean_value(v) for k, v in record.items()}
            cleaned_records.append(cleaned_record)
        return cleaned_records
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching attendance data: {str(e)}")

# Validate file size and type
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

FETCH_PHOTOS_URL = "http://192.168.1.177:8000/fetch-classroom-photos"

@app.post("/upload-photo/")
async def upload_photo(image_data: UploadFile = File(...)):
    """
    Endpoint to upload and store a photo in MongoDB.
    """
    try:
        if image_data.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_CONTENT_TYPES)}"
            )

        photo_bytes = await image_data.read()
        if len(photo_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413, 
                detail=f"File too large. Maximum size is {MAX_FILE_SIZE / (1024 * 1024)} MB"
            )

        encoded_photo = base64.b64encode(photo_bytes).decode("utf-8")
        photo_doc = {
            "filename": image_data.filename,
            "content_type": image_data.content_type,
            "image_data": encoded_photo,
            "upload_date": datetime.utcnow(),
            "file_size": len(photo_bytes)
        }
        result = photos_collection.insert_one(photo_doc)

        logger.info(f"Photo uploaded successfully: {image_data.filename}")

        # Trigger the external API after successful upload
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get("http://192.168.1.177:8000/fetch-classroom-photos")
                logger.info(f"Fetch Classroom Photos API Response: {response.status_code}, {response.text}")
        except Exception as fetch_err:
            logger.error(f"Failed to call Fetch Classroom Photos API: {fetch_err}")

        return JSONResponse(
            status_code=200,
            content={
                "message": "Photo uploaded successfully",
                "photo_id": str(result.inserted_id),
                "filename": image_data.filename
            }
        )

    except HTTPException as http_err:
        logger.error(f"HTTP Error: {http_err.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during upload: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during photo upload")

@app.get("/list-photos/")
async def list_photos(limit: int = 10, skip: int = 0):
    """
    Retrieve a list of uploaded photos (metadata only)
    """
    try:
        photos = list(photos_collection.find({}, {"image_data": 0}).limit(limit).skip(skip))
        for photo in photos:
            photo['_id'] = str(photo['_id'])
        return JSONResponse(status_code=200, content={"photos": photos, "count": len(photos)})
    except Exception as e:
        logger.error(f"Error listing photos: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving photo list")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)