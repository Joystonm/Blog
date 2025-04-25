import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/Article.css"; // Import the CSS file
function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/articles/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>
      <div>
        <p>{article.content}</p>
        {/* Removed image rendering */}
      </div>
    </div>
  );
}

export default Article;
