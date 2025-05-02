import React from 'react';
import '../style/About.css'; // Assuming the CSS is saved as About.css

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About BlogVerse</h1>
      <p className="about-text">
        <strong>BlogVerse</strong> is a modern blogging platform built with security and convenience in mind. It provides a seamless experience for users to express their ideas, thoughts, and stories in a digital format.
      </p>
      <ul className="about-list">
        <li><strong>JWT Authentication</strong>: Secure login and access management using JSON Web Tokens.</li>
        <li><strong>Post Articles</strong>: Write and publish your own blog posts effortlessly.</li>
        <li><strong>Edit Articles</strong>: Update your existing posts with new content anytime.</li>
        <li><strong>Generate Quick Summaries</strong>: Instantly create summaries for lengthy content using advanced summarization tools.</li>
      </ul>
      <p className="about-footer">
        Whether you're a passionate writer or a reader who enjoys crisp summaries, BlogVerse is designed to enhance your blogging experience.
      </p>
    </div>
  );
};

export default About;
