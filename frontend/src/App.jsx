import { useState } from "react";
import MicButton from "./MicButton";

function App() {
  const [transcript, setTranscript] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Telugu AI Tutor</h1>

      <MicButton setTranscript={setTranscript} />

      <h2>Transcript</h2>

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
    </div>
  );
}

export default App;