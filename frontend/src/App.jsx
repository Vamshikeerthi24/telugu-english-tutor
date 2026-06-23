import { useState } from "react";
import MicButton from "./MicButton";

function App() {
  const [transcript, setTranscript] = useState("");

  const expectedAnswer = "my name is vamshi";

  return (
    <div style={{ padding: "20px" }}>
      <h1>Telugu AI Tutor</h1>

      <h2>Lesson 1</h2>

      <p>
        Say:
        <strong> My name is Vamshi </strong>
      </p>

      <MicButton setTranscript={setTranscript} />

      <h2>Your Transcript</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          minHeight: "50px",
          marginTop: "10px",
        }}
      >
        {transcript}
      </div>

      {transcript && (
        <div style={{ marginTop: "20px" }}>
          {transcript.toLowerCase().includes(expectedAnswer) ? (
            <h3>✅ Correct!</h3>
          ) : (
            <h3>❌ Try Again</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default App;