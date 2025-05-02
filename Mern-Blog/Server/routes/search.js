const express = require('express');
const axios = require('axios');
const router = express.Router();

const HUGGING_FACE_API_TOKEN = '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';
const MODEL_URL = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';

// Dummy article data
const articles = [
  { id: 1, title: "AI in Healthcare", content: "Artificial intelligence is revolutionizing healthcare by assisting in diagnosis and treatment." },
  { id: 2, title: "Climate Change Effects", content: "Climate change is causing rising sea levels, extreme weather, and biodiversity loss." },
  { id: 3, title: "Benefits of Exercise", content: "Regular exercise improves mental health, physical strength, and longevity." },
];

// Cosine similarity function
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
}

router.post('/', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: 'Query is required' });

  try {
    // Get embedding for the query
    const queryResponse = await axios.post(MODEL_URL, { inputs: query }, {
      headers: { Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}` }
    });
    const queryEmbedding = queryResponse.data[0];

    // Get embeddings for articles and compute similarity
    const results = await Promise.all(articles.map(async (article) => {
      const articleResponse = await axios.post(MODEL_URL, { inputs: article.content }, {
        headers: { Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}` }
      });

      const articleEmbedding = articleResponse.data[0];
      const similarity = cosineSimilarity(queryEmbedding, articleEmbedding);

      return { ...article, similarity };
    }));

    // Sort and return top 3
    results.sort((a, b) => b.similarity - a.similarity);
    res.json({ results: results.slice(0, 3) });

  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Failed to process search query' });
  }
});

module.exports = router;
