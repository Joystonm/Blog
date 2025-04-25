// src/NotFound.js
import React from 'react';
import '../style/NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="back-home">Go Back Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
