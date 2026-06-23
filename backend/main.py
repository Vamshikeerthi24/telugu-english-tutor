from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading Whisper model...")

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("Whisper model loaded!")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/upload-audio")
async def upload_audio(audio: UploadFile = File(...)):
    try:
        print("Request received")

        contents = await audio.read()

        print("Audio bytes:", len(contents))

        with open("recording.webm", "wb") as f:
            f.write(contents)

        print("Audio saved")

        segments, info = model.transcribe(
            "recording.webm"
        )

        transcript = ""

        for segment in segments:
            transcript += segment.text + " "

        print("Transcript:", transcript)

        return {
            "transcript": transcript
        }

    except Exception as e:
        print("ERROR:", str(e))

        return {
            "transcript": f"ERROR: {str(e)}"
        }