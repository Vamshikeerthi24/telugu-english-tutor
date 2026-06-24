import { useRef, useState } from "react";

function MicButton(props) {
  const { setTranscript, setFeedback } = props;

  const [recording, setRecording] = useState(false);

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

      setRecording(true);
    } catch (error) {
      console.error(error);
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

        const response = await fetch(
          "http://127.0.0.1:8000/upload-audio",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        if (typeof setTranscript === "function") {
          setTranscript(data.transcript);
        }

        if (
          typeof setFeedback === "function" &&
          data.feedback
        ) {
          setFeedback(data.feedback);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    };

    mediaRecorderRef.current.stop();

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={
          recording
            ? stopRecording
            : startRecording
        }
        className={`
          w-28
          h-28
          rounded-full
          text-4xl
          transition-all
          duration-300
          shadow-xl
          ${
            recording
              ? "bg-red-500 hover:bg-red-400"
              : "bg-blue-600 hover:bg-blue-500"
          }
        `}
      >
        🎤
      </button>

      <p className="mt-4 text-lg">
        {recording
          ? "Recording..."
          : "Tap microphone to speak"}
      </p>
    </div>
  );
}

export default MicButton;