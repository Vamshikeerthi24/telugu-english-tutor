import { useRef } from "react";

function MicButton() {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.start();

      console.log("Recording started");
    } catch (error) {
      console.error("Microphone Error:", error);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = async () => {
      try {
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const formData = new FormData();

        formData.append(
          "audio",
          audioBlob,
          "recording.webm"
        );

        console.log("Sending audio to backend...");

        const response = await fetch(
          "http://127.0.0.1:8000/upload-audio",
          {
            method: "POST",
            body: formData,
          }
        );

        console.log("Response status:", response.status);

        const data = await response.json();

        console.log("Backend response:", data);

        alert(`Transcript: ${data.transcript}`);
      } catch (error) {
        console.error("FETCH ERROR:", error);
        alert("Fetch failed. Check browser console.");
      }
    };

    mediaRecorderRef.current.stop();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) =>
        track.stop()
      );

      streamRef.current = null;
    }

    console.log("Recording stopped");
  };

  return (
    <div>
      <button onClick={startRecording}>
        Start Recording
      </button>

      <button onClick={stopRecording}>
        Stop Recording
      </button>
    </div>
  );
}

export default MicButton;

        

  