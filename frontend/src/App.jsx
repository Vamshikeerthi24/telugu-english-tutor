import { lessons } from "./data/lessons";
import { useState, useEffect } from "react";
import MicButton from "./MicButton";

function App() {
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");

  const [lessonIndex, setLessonIndex] = useState(() => {
    const savedLesson = localStorage.getItem("lessonIndex");
    return savedLesson ? Number(savedLesson) : 0;
  });

  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? Number(savedScore) : 0;
  });

  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    localStorage.setItem("lessonIndex", lessonIndex);
  }, [lessonIndex]);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const lesson = lessons[lessonIndex];

  const normalizedTranscript = transcript.toLowerCase();

  const isCorrect =
    transcript &&
    lesson.keywords.some((word) =>
      normalizedTranscript.includes(word)
    );

  const progress =
    ((lessonIndex + 1) / lessons.length) * 100;

  const handleContinue = () => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswered(false);
    setTranscript("");
    setFeedback("");

    if (lessonIndex < lessons.length - 1) {
      setLessonIndex((prev) => prev + 1);
    }
  };

  const restartCourse = () => {
    setLessonIndex(0);
    setScore(0);
    setTranscript("");
    setFeedback("");
    setAnswered(false);

    localStorage.removeItem("lessonIndex");
    localStorage.removeItem("score");
  };

  if (
    lessonIndex === lessons.length - 1 &&
    isCorrect
  ) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="bg-slate-800 p-10 rounded-2xl text-center">
          <h1 className="text-5xl mb-4">
            🎉 Course Complete!
          </h1>

          <p className="text-2xl mb-6">
            Score: {score + 1}/{lessons.length}
          </p>

          <button
            onClick={restartCourse}
            className="bg-blue-600 px-6 py-3 rounded-xl"
          >
            Restart Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-8">
          Telugu AI Tutor
        </h1>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>
              Lesson {lessonIndex + 1} of {lessons.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 mb-8">
          <h3 className="text-slate-400">
            English
          </h3>

          <p className="text-2xl mb-4">
            {lesson.english}
          </p>

          <h3 className="text-slate-400">
            Telugu
          </h3>

          <p className="text-4xl text-green-400">
            {lesson.telugu}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 mb-8 text-center">
          <MicButton
            setTranscript={(text) => {
              setTranscript(text);
              setAnswered(true);
            }}
            setFeedback={(text) => {
              setFeedback(text);
            }}
          />
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl mb-4">
            Your Transcript
          </h2>

          <div>
            {transcript ||
              "Speak to see your transcript"}
          </div>
        </div>

        {feedback && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl mb-4 text-blue-400">
              AI Teacher Feedback
            </h2>

            <div className="whitespace-pre-wrap">
              {feedback}
            </div>
          </div>
        )}

        {transcript && (
          <div className="text-center">
            {isCorrect ? (
              <>
                <h2 className="text-green-400 text-3xl mb-4">
                  ✅ Correct!
                </h2>

                <button
                  onClick={handleContinue}
                  className="bg-blue-600 px-6 py-3 rounded-xl"
                >
                  Continue →
                </button>
              </>
            ) : (
              <h2 className="text-red-400 text-3xl">
                ❌ Try Again
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;