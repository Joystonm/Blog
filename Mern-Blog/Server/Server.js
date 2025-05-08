// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("./models/User");
// const Article = require("./models/Article");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Static file serving
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // File upload handling
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost/mern-blog", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// // Authentication middleware
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Access denied, no token provided" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Routes

// // User registration
// app.post("/api/auth/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   // Input validation
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Email format validation
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: "Invalid email format" });
//   }

//   try {
//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Don't send back password
//     const userToReturn = { ...newUser._doc };
//     delete userToReturn.password;

//     res.status(201).json({ token, user: userToReturn });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Error registering user", error: err.message });
//   }
// });

// // User login
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Don't send back password
//     const userToReturn = { ...user._doc };
//     delete userToReturn.password;

//     res.json({ token, user: userToReturn });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Error logging in" });
//   }
// });

// // Articles routes
// app.get("/api/articles", async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching articles" });
//   }
// });

// app.get("/api/articles/:id", async (req, res) => {
//   try {
//     const article = await Article.findById(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article not found" });
//     res.json(article);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching the article" });
//   }
// });

// app.post(
//   "/api/articles",
//   authenticateToken,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { title, content } = req.body;
//       const image = req.file ? `/uploads/${req.file.filename}` : null;

//       const newArticle = new Article({
//         title,
//         content,
//         image,
//         author: req.user._id,
//       });

//       await newArticle.save();
//       res.status(201).json(newArticle);
//     } catch (err) {
//       res.status(500).json({ message: "Error creating the article" });
//     }
//   }
// );

// // Logout
// app.post("/api/auth/logout", (req, res) => {
//   res.status(200).json({ message: "Logged out successfully" });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Article = require("./models/Article");
const summarizeRoute = require("./routes/summarize");
const searchRoute = require("./routes/search");
const userProfileRoute = require("./routes/userProfile"); // Adjust path if needed
const redditRoutes = require('./routes/reddit');

const app = express();
app.use(cors());
app.use(express.json());

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// User profile routes
app.use("/api/users", userProfileRoute);

// MongoDB connection
mongoose
  .connect("mongodb://localhost/mern-blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// User registration
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Don't send back password
    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json({ token, user: userToReturn });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// User login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Don't send back password
    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    res.json({ token, user: userToReturn });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Articles routes
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
});

app.get("/api/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Error fetching the article" });
  }
});

app.post(
  "/api/articles",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const newArticle = new Article({
        title,
        content,
        image,
        author: req.user._id,
      });

      await newArticle.save();
      res.status(201).json(newArticle);
    } catch (err) {
      res.status(500).json({ message: "Error creating the article" });
    }
  }
);

// Update article content
app.put(
  "/api/articles/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        { title, content, image },
        { new: true }
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(updatedArticle);
    } catch (err) {
      res.status(500).json({ message: "Error updating the article" });
    }
  }
);

// Quick summary route
// app.use("/api/summarize", summarizeRoute);
app.use("/api", summarizeRoute);

// Use the /search route
app.use("/search", searchRoute);

//Reddit routes
app.use('/api/reddit', redditRoutes);



// Logout
app.post("/api/auth/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
