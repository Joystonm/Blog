import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/ArticleList.css"; 
function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  }, []);

  return (
    <div>
      <h2>All Articles</h2>
      {articles.map((article) => (
        <div className="article" key={article._id}>
          <Link to={`/articles/${article._id}`}>
            <h3>{article.title}</h3>
          </Link>
          {/* <p>{article.content.substring(0, 100)}...</p> */}
          <p  dangerouslySetInnerHTML={{ __html: article.content.substring(0, 100) + "..." }} />

        </div>
      ))}
    </div>
  );
}

export default ArticleList;

