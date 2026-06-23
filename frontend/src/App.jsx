import { useState } from "react";
import MicButton from "./MicButton";

function App() {
  const [transcript, setTranscript] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0);

  const lessons = [
    {
      english: "My name is Vamshi",
      telugu: "నా పేరు వంశీ",
      keywords: ["vam", "wam", "name"],
    },
    {
      english: "What is your name?",
      telugu: "మీ పేరు ఏమిటి?",
      keywords: ["your", "name"],
    },
    {
      english: "I live in America",
      telugu: "నేను అమెరికాలో ఉంటాను",
      keywords: ["america", "live"],
    },
  ];

  const lesson = lessons[lessonIndex];

  const normalizedTranscript = transcript.toLowerCase();

  const isCorrect = lesson.keywords.some((word) =>
    normalizedTranscript.includes(word)
  );

  const progress =
    ((lessonIndex + 1) / lessons.length) * 100;

  const nextLesson = () => {
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
      setTranscript("");
    }
  };

  const previousLesson = () => {
    if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1);
      setTranscript("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>Telugu AI Tutor</h1>

      <h2>
        Lesson {lessonIndex + 1} of {lessons.length}
      </h2>

      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ddd",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green",
            borderRadius: "10px",
          }}
        ></div>
      </div>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>English</h3>
        <p>{lesson.english}</p>

        <h3>Telugu</h3>
        <p style={{ fontSize: "24px" }}>
          {lesson.telugu}
        </p>
      </div>

      <MicButton setTranscript={setTranscript} />

      <h2>Your Transcript</h2>

      <div
        style={{
          border: "1px solid gray",
          minHeight: "60px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        {transcript}
      </div>

      {transcript && (
        <div style={{ marginTop: "20px" }}>
          {isCorrect ? (
            <h2>✅ Correct!</h2>
          ) : (
            <h2>❌ Try Again</h2>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={previousLesson}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>

        <button onClick={nextLesson}>
          Next Lesson
        </button>
      </div>
    </div>
  );
}

export default App;