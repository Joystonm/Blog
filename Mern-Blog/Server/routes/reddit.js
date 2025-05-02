// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// // Define your endpoint
// router.get('/trending', async (req, res) => {
//   try {
//     const response = await axios.get('https://www.reddit.com/r/technology/top.json?limit=10', {
//       headers: { 'User-Agent': 'BlogVerse/1.0' }
//     });

//     const posts = response.data.data.children.map(post => ({
//       title: post.data.title,
//       url: `https://reddit.com${post.data.permalink}`,
//       score: post.data.score,
//       comments: post.data.num_comments,
//       author: post.data.author
//     }));

//     res.json(posts);
//   } catch (err) {
//     console.error('Reddit API error:', err.message);
//     res.status(500).json({ error: 'Failed to fetch Reddit trends' });
//   }
// });

// module.exports = router;


const express = require('express');
const axios = require('axios');
const router = express.Router();

// A list of predefined categories based on keywords (this is a simple example, you can make it more advanced)
const categories = {
  technology: ['AI', 'Machine Learning', 'Blockchain', 'Cloud', 'Programming'],
  science: ['Space', 'Physics', 'Biology', 'Chemistry'],
  politics: ['Election', 'Government', 'Policy', 'Debate'],
  business: ['Startups', 'Economy', 'Finance', 'Cryptocurrency'],
};

// Define your endpoint
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/technology/top.json?limit=10', {
      headers: { 'User-Agent': 'BlogVerse/1.0' },
    });

    const posts = response.data.data.children.map(post => ({
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      score: post.data.score,
      comments: post.data.num_comments,
      author: post.data.author,
    }));

    // Categorize the trending posts based on keywords in titles
    const categoryCounts = {
      technology: 0,
      science: 0,
      politics: 0,
      business: 0,
    };

    posts.forEach(post => {
      Object.keys(categories).forEach(category => {
        categories[category].forEach(keyword => {
          if (post.title.toLowerCase().includes(keyword.toLowerCase())) {
            categoryCounts[category] += 1;
          }
        });
      });
    });

    // Recommend the top categories based on trending posts
    const recommendedCategories = Object.entries(categoryCounts)
      .filter(([category, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]) // Sort by most frequent
      .map(([category, count]) => category);

    // Send the response with trending posts and recommendations
    res.json({
      posts,
      recommendedCategories,
    });
  } catch (err) {
    console.error('Reddit API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Reddit trends' });
  }
});

module.exports = router;
