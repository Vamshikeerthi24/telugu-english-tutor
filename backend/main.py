from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/upload-audio")
async def upload_audio(audio: UploadFile = File(...)):
    contents = await audio.read()

    # Save audio file to backend folder
    with open("recording.webm", "wb") as f:
        f.write(contents)

    print(f"Saved file: recording.webm")
    print(f"Size: {len(contents)} bytes")

    return {
        "message": "Audio saved successfully",
        "filename": audio.filename,
        "size": len(contents)
    }