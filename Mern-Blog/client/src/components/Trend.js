import React, { useEffect, useState } from 'react';
import '../style/Trend.css'; // Assuming you have a CSS file for styling
import axios from 'axios';

const Trend = () => {
  const [trends, setTrends] = useState([]);
  const [recommendedCategories, setRecommendedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get('/api/reddit/trending');
        setTrends(res.data.posts);
        setRecommendedCategories(res.data.recommendedCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trends:', error);
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  if (loading) return <div>Loading trends...</div>;

  return (
    <div className="trend-page">
      {/* Show the recommended categories at the top */}
      <h3>Suggested Categories to Write About:</h3>
      <ul className="recommended-categories">
        {recommendedCategories.map((category, idx) => (
          <li key={idx}>{category}</li>
        ))}
      </ul>

      <h2>🔥 Trending</h2>
      <ul className="trend-list">
        {trends.map((post, idx) => (
          <li key={idx} className="trend-item">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
            <p>💬 {post.comments} comments | 👍 {post.score} points | 👤 {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trend;

