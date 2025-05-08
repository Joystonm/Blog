// //routes/summarize.js
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// const HUGGINGFACE_API_KEY = "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";
// // const HUGGINGFACE_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
// const HUGGINGFACE_URL =
//   "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";

// router.post("/", async (req, res) => {
//   const { text } = req.body;

//   if (!text || text.trim() === "") {
//     return res.status(400).json({ error: "Text is required" });
//   }

//   try {
//     const response = await axios.post(
//       HUGGINGFACE_URL,
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     const result = response.data;

//     // Check if result is array and contains summary_text
//     if (Array.isArray(result) && result[0]?.summary_text) {
//       res.json({ summary: result[0].summary_text });
//     } else {
//       res
//         .status(500)
//         .json({ error: "Unexpected response format from Hugging Face API" });
//     }
//   } catch (error) {
//     console.error("Error summarizing text:", error.message);
//     res.status(500).json({ error: "Error summarizing text" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// const HUGGINGFACE_API_KEY = "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";

// // Use a faster, more reliable model
// // const HUGGINGFACE_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";
// const HUGGINGFACE_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

// router.post("/", async (req, res) => {
//   const { text } = req.body;

//   if (!text || typeof text !== "string" || text.trim() === "") {
//     return res.status(400).json({ error: "Text is required and must be a non-empty string" });
//   }

//   try {
//     const response = await axios.post(
//       HUGGINGFACE_URL,
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//           "Accept": "application/json", // ✅ Fix Accept header issue
//         },
//         timeout: 60000, // ✅ Increased timeout to 60s just in case
//       }
//     );

//     const result = response.data;
//     if (Array.isArray(result) && result[0]?.summary_text) {
//       res.json({ summary: result[0].summary_text });
//     } else {
//       console.error("Unexpected API response:", result);
//       res.status(500).json({ error: "Unexpected response format from Hugging Face API" });
//     }
//   } catch (error) {
//     console.error("Error from Hugging Face:", error.response?.data || error.message);
//     res.status(500).json({ error: "Error summarizing text" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { summarizeText } = require("../models/summarize.mjs"); // Import summarizeText function

// router.post("/summarize", async (req, res) => {
//   const { text } = req.body;

//   if (!text || text.trim() === "") {
//     return res.status(400).json({ error: "Text is required" });
//   }

//   try {
//     const summary = await summarizeText(text);
//     res.json({ summary });
//   } catch (error) {
//     console.error("Error in summarization:", error.message);
//     res.status(500).json({ error: "Failed to summarize text" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

// Dynamically import the summarizeText function
async function importSummarizer() {
  try {
    const { summarizeText } = await import('../models/summarize.mjs');
    return summarizeText;
  } catch (err) {
    console.error('Error importing summarize.mjs:', err);
    throw new Error('Failed to import summarize.mjs');
  }
}

// POST route to handle summarization
router.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const summarizeText = await importSummarizer(); // Dynamically load summarizeText function
    const summary = await summarizeText(text); // Summarize the provided text
    res.json({ summary });
  } catch (error) {
    console.error("Error in summarization:", error.message);
    res.status(500).json({ error: "Failed to summarize text" });
  }
});

module.exports = router;
