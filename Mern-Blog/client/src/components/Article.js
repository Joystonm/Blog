// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../style/Article.css"; // Import the CSS file
// function Article() {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`/api/articles/${id}`)
//       .then((response) => {
//         setArticle(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the article!", error);
//       });
//   }, [id]);

//   if (!article) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="article-container">
//       <h1>{article.title}</h1>
//       <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>
//       <div
//         className="article-content"
//         dangerouslySetInnerHTML={{ __html: article.content }}
//       />
//     </div>
//   );
// }

// export default Article;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import { MdEdit } from "react-icons/md";
import "react-quill/dist/quill.snow.css"; // ReactQuill styles
import "../style/Article.css"; // Custom styles

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit

  useEffect(() => {
    axios
      .get(`/api/articles/${id}`)
      .then((response) => {
        const fetchedArticle = response.data;
        setArticle(fetchedArticle);
        setContent(fetchedArticle.content);

        const now = new Date();
        const createdAt = new Date(fetchedArticle.createdAt);
        const timeDifference = (now - createdAt) / 1000 / 60; // Minutes

        if (timeDifference <= 5) {
          setCanEdit(true); // Allow editing within 5 minutes
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [id]);

  const handleSave = () => {
    const updatedArticle = {
      ...article,
      content: content,
    };

    const token = localStorage.getItem("token");

    axios
      .put(`/api/articles/${id}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`, // Add your JWT or auth token
        },
      })
      .then((response) => {
        console.log("Article updated successfully:", response.data);
        setArticle(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("There was an error saving the article:", error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>

      {canEdit && !isEditing && (
        <button onClick={handleEditClick} className="edit-icon">
          <i className="fa fa-edit"></i> edit<MdEdit />
        </button>
      )}

      {isEditing ? (
        <div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Edit your content here..."
            style={{ height: "300px", marginBottom: "20px" }}
          />
          <div className="save-button-container">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}
    </div>
  );
}

export default Article;
