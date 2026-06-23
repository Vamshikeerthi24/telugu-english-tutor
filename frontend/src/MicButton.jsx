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

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        alert(
          `Audio captured! Size: ${audioBlob.size} bytes`
        );

        console.log("Audio Blob:", audioBlob);
      };

      mediaRecorder.start();

      console.log("Recording Started");
    } catch (error) {
      console.error(error);
      alert("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    console.log("Recording Stopped");
  };

  return (
    <div>
      <button
        onClick={startRecording}
        style={{
          padding: "10px",
          margin: "10px",
          fontSize: "16px",
        }}
      >
        Start Recording
      </button>

      <button
        onClick={stopRecording}
        style={{
          padding: "10px",
          margin: "10px",
          fontSize: "16px",
        }}
      >
        Stop Recording
      </button>
    </div>
  );
}

export default MicButton;

        

  