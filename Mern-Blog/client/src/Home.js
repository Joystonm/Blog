// src/Home.js
import './style/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to BlogVerse</h1>
        <p className="hero-subtitle">Your daily dose of insightful articles, tutorials, and stories.</p>
        <a href="/articles" className="hero-button">Explore Articles</a>
      </header>

      <section className="about-section">
        <h2>Why BlogVerse?</h2>
        <p>
          Whether you're a tech enthusiast, a lifestyle blogger, or someone who just loves reading,
          BlogVerse is the platform that brings fresh perspectives from creative minds around the globe.
        </p>
      </section>

      <section className="categories-section">
        <h2>Popular Categories</h2>
        <div className="categories">
          <div className="category-card">Technology</div>
          <div className="category-card">Lifestyle</div>
          <div className="category-card">Travel</div>
          <div className="category-card">Health</div>
          <div className="category-card">Education</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
