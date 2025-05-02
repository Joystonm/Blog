// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Article from "./components/Article";
import ArticleList from "./components/ArticleList";
import NotFound from "./components/NotFound";
import Post from "./components/Post"; // Import the Post component
import SignUp from "./components/SignUp"; // Import the SignUp component
import Login from "./components/Login"; // Import the Login component
import Logout from "./components/Logout"; // Import the Logout component
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider
import About from "./components/About"; // Import the About component
import Profile from "./components/Profile"; // Import the Profile component 
import Trend from "./components/Trend"; // Import the Trend component 
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/post" element={<Post />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trend" element={<Trend />} />
          <Route path="*" element={<NotFound />} />
          {/* You can add more routes here like <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
