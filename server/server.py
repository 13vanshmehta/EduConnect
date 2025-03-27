from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import os
import base64
import uvicorn
from datetime import datetime
import logging
from typing import List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB Connection
try:
    MONGO_DB_URL = os.environ.get(
        "MONGO_DB_URL", 
        "mongodb+srv://mehtavansh13042005:u7Tv8ENi22n0mK7W@techverse.ntbynet.mongodb.net/?retryWrites=true&w=majority&appName=TechVerse"
    )

    # Create MongoDB client and database
    client = MongoClient(MONGO_DB_URL)
    db = client["Classroom_photos"]  # Create/use Classroom_photos database
    photos_collection = db["images"]  # Create images collection
except Exception as e:
    logger.error(f"MongoDB Connection Error: {e}")
    raise

# Create FastAPI app
app = FastAPI(title="Classroom Photo Upload API")

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

# Validate file size and type
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = [
    "image/jpeg", 
    "image/png", 
    "image/gif", 
    "image/webp"
]

@app.post("/upload-photo/")
async def upload_photo(image_data: UploadFile = File(...)):
    """
    Endpoint to upload and store a photo in MongoDB
    
    - Validates file size
    - Checks file type
    - Encodes image to base64
    - Stores in MongoDB
    """
    try:
        # Validate file type
        if image_data.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_CONTENT_TYPES)}"
            )

        # Read the uploaded file
        photo_bytes = await image_data.read()
        
        # Validate file size
        if len(photo_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413, 
                detail=f"File too large. Maximum size is {MAX_FILE_SIZE / (1024 * 1024)} MB"
            )
        
        # Encode the photo to base64
        encoded_photo = base64.b64encode(photo_bytes).decode("utf-8")
        
        # Prepare document for MongoDB
        photo_doc = {
            "filename": image_data.filename,
            "content_type": image_data.content_type,
            "image_data": encoded_photo,
            "upload_date": datetime.utcnow(),
            "file_size": len(photo_bytes)
        }
        
        # Insert photo document
        result = photos_collection.insert_one(photo_doc)
        
        logger.info(f"Photo uploaded successfully: {image_data.filename}")
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Photo uploaded successfully",
                "photo_id": str(result.inserted_id),
                "filename": image_data.filename
            }
        )
    
    except HTTPException as http_err:
        # Re-raise HTTP exceptions
        logger.error(f"HTTP Error: {http_err.detail}")
        raise
    except Exception as e:
        # Unexpected server error
        logger.error(f"Unexpected error during upload: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during photo upload")

# Optional: Add endpoint to list uploaded photos
@app.get("/list-photos/")
async def list_photos(limit: int = 10, skip: int = 0):
    """
    Retrieve a list of uploaded photos (metadata only)
    """
    try:
        # Retrieve photos, excluding large image_data
        photos = list(photos_collection.find({}, {
            "image_data": 0
        }).limit(limit).skip(skip))
        
        # Convert ObjectId to string for JSON serialization
        for photo in photos:
            photo['_id'] = str(photo['_id'])
        
        return JSONResponse(
            status_code=200,
            content={
                "photos": photos,
                "count": len(photos)
            }
        )
    except Exception as e:
        logger.error(f"Error listing photos: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving photo list")

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)