import os
from dotenv import load_dotenv
from google import genai

env_path = os.path.join(
    os.path.dirname(__file__),
    ".env"
)

load_dotenv(env_path)

api_key = os.getenv("GEMINI_API_KEY")

print("API Key Found:", api_key is not None)

client = genai.Client(api_key=api_key)


def get_feedback(expected_text, transcript):
    try:
        prompt = f"""
You are a friendly Telugu language tutor.

Expected sentence:
{expected_text}

Student said:
{transcript}

Provide:

1. Score out of 10
2. What was correct
3. What could improve
4. Encouraging feedback

Keep it under 100 words.
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", str(e))
        return f"Gemini Error: {str(e)}"