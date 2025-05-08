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



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import { MdEdit } from "react-icons/md";
// import "react-quill/dist/quill.snow.css"; // ReactQuill styles
// import "../style/Article.css"; // Custom styles

// function Article() {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [content, setContent] = useState("");
//   const [canEdit, setCanEdit] = useState(false);
//   const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit

//   useEffect(() => {
//     axios
//       .get(`/api/articles/${id}`)
//       .then((response) => {
//         const fetchedArticle = response.data;
//         setArticle(fetchedArticle);
//         setContent(fetchedArticle.content);

//         const now = new Date();
//         const createdAt = new Date(fetchedArticle.createdAt);
//         const timeDifference = (now - createdAt) / 1000 / 60; // Minutes

//         if (timeDifference <= 5) {
//           setCanEdit(true); // Allow editing within 5 minutes
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the article!", error);
//       });
//   }, [id]);

//   const handleSave = () => {
//     const updatedArticle = {
//       ...article,
//       content: content,
//     };

//     const token = localStorage.getItem("token");

//     axios
//       .put(`/api/articles/${id}`, updatedArticle, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add your JWT or auth token
//         },
//       })
//       .then((response) => {
//         console.log("Article updated successfully:", response.data);
//         setArticle(response.data);
//         setIsEditing(false);
//       })
//       .catch((error) => {
//         console.error("There was an error saving the article:", error);
//       });
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   if (!article) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="article-container">
//       <h1>{article.title}</h1>
//       <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>

//       {canEdit && !isEditing && (
//         <button onClick={handleEditClick} className="edit-icon">
//           <i className="fa fa-edit"></i> edit<MdEdit />
//         </button>
//       )}

//       {isEditing ? (
//         <div>
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             placeholder="Edit your content here..."
//             style={{ height: "300px", marginBottom: "20px" }}
//           />
//           <div className="save-button-container">
//             <button onClick={handleSave}>Save</button>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="article-content"
//           dangerouslySetInnerHTML={{ __html: article.content }}
//         />
//       )}
//     </div>
//   );
// }

// export default Article;


// Ai Integerate
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import { MdEdit } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import "../style/Article.css";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/articles/${id}`)
      .then((response) => {
        const fetchedArticle = response.data;
        setArticle(fetchedArticle);
        setContent(fetchedArticle.content);

        const now = new Date();
        const createdAt = new Date(fetchedArticle.createdAt);
        const timeDifference = (now - createdAt) / 1000 / 60;

        if (timeDifference <= 5) {
          setCanEdit(true);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the article:", error);
        setError("Error loading the article. Please try again later.");
        setIsLoading(false);
      });
  }, [id]);

  // Function to strip HTML tags and get plain text content
  const extractTextFromHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // const generateSummary = async (text) => {
  //   try {
  //     setIsSummarizing(true);
  //     console.log("Sending text to summarize:", text);

  //     const response = await axios.post("/api/summarize", { text });

  //     console.log("Summary response:", response.data);
  //     if (response.data && response.data.summary) {
  //       setSummary(response.data.summary);
  //     } else {
  //       throw new Error("Invalid summary response");
  //     }
  //   } catch (error) {
  //     console.error("Error generating summary:", error.response?.data || error.message);
  //     setError("Error generating summary. Please try again later.");
  //   } finally {
  //     setIsSummarizing(false);
  //   }
  // };

  const generateSummary = async (text) => {
    try {
      setIsSummarizing(true);
      console.log("Sending text to summarize:", text);
  
      // Update URL based on your local environment setup
      const response = await axios.post("http://localhost:3000/api/summarize", { text });
  
      console.log("Summary response:", response.data);
      if (response.data && response.data.summary) {
        setSummary(response.data.summary);
      } else {
        throw new Error("Invalid summary response");
      }
    } catch (error) {
      console.error("Error generating summary:", error.response?.data || error.message);
      setError("Error generating summary. Please try again later.");
    } finally {
      setIsSummarizing(false);
    }
  };
  
  const handleSave = () => {
    const updatedArticle = {
      ...article,
      content: content,
    };

    const token = localStorage.getItem("token");

    axios
      .put(`/api/articles/${id}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Article updated successfully:", response.data);
        setArticle(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving the article:", error);
        setError("Error saving the article. Please try again later.");
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isLoading) {
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p>Published on: {new Date(article.createdAt).toLocaleDateString()}</p>

      {/* Quick Summary Button */}
      <button
        onClick={() => generateSummary(extractTextFromHtml(content))}
        className="summary-button"
        disabled={isSummarizing}
      >
        {isSummarizing ? "Generating Summary..." : "Generate Quick Summary"}
      </button>

      {/* Display the summary */}
      {summary && (
        <div className="summary-box">
          <h3>Quick Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {/* Edit Section */}
      {canEdit && !isEditing && (
        <button onClick={handleEditClick} className="edit-icon">
          <MdEdit /> Edit
        </button>
      )}

      {/* Edit Article Content */}
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
