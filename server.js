import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/ask-gemini", async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt:", prompt);

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini raw:", data);

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ answer });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
