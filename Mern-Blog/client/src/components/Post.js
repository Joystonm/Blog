import React, { useState } from 'react';
import axios from 'axios';

function Post() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to post articles');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/articles', formData, {
        headers: { Authorization: token },
      });
      alert('Article Posted!');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error posting the article', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        required
      ></textarea>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Post Article</button>
    </form>
  );
}

export default Post;
