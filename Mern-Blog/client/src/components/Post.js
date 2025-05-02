// import React, { useState } from 'react';
// import axios from 'axios';
// import "../style/Post.css"; // Assuming you have a CSS file for styling
// function Post() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please login to post articles');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (image) formData.append('image', image);

//     try {
//       await axios.post('http://localhost:8000/api/articles', formData, {
//         headers: { Authorization: token },
//       });
//       alert('Article Posted!');
//       setTitle('');
//       setContent('');
//       setImage(null);
//     } catch (error) {
//       console.error('Error posting the article', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input
//         type="text"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         value={content}
//         onChange={e => setContent(e.target.value)}
//         placeholder="Content"
//         required
//       ></textarea>

//       <button type="submit">Post Article</button>
//     </form>
//   );
// }

// export default Post;

import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/Post.css"; // Keep your custom styles

function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to post articles");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // This is now HTML
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/articles", formData, {
        headers: { Authorization: token },
      });
      alert("Article Posted!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error posting the article", error);
    }
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      {/* <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your content here..."
        style={{ height: "300px", marginBottom: "20px" }}
      /> */}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your content here..."
        style={{ height: "300px", marginBottom: "20px" }}
        modules={modules} // Attach custom toolbar
      />

      <button type="submit">Post</button>
    </form>
  );
}

export default Post;
