const express = require("express");
const axios = require("axios");
const router = express.Router();

const HUGGINGFACE_API_KEY = "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";
const HUGGINGFACE_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      HUGGINGFACE_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data;

    // Check if result is array and contains summary_text
    if (Array.isArray(result) && result[0]?.summary_text) {
      res.json({ summary: result[0].summary_text });
    } else {
      res.status(500).json({ error: "Unexpected response format from Hugging Face API" });
    }

  } catch (error) {
    console.error("Error summarizing text:", error.message);
    res.status(500).json({ error: "Error summarizing text" });
  }
});

module.exports = router;
