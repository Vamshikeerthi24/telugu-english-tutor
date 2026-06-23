from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

    print(f"Received audio file: {audio.filename}")
    print(f"Size: {len(contents)} bytes")

    return {
        "filename": audio.filename,
        "size": len(contents)
    }