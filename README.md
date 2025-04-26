# BlogVerse - MERN Stack Blogging Application


BlogVerse is a full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Project Structure

```
MERN-BLOG/
├── client/             # Frontend React application
├── server/             # Backend Node.js/Express server
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── node_modules/   # Backend dependencies
│   ├── .env            # Environment variables
│   └── server.js       # Main server file
├── package.json        # Root package.json
└── package-lock.json   # Dependency lock file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB installation


### Configuration

1. Create a `.env` file in the `server` directory with the following variables:

```
  JWT_SECRET=your-very-secure-secret-key-12345  # For encrypting JWTs
  MONGODB_URI=mongodb://localhost/mern-blog     # Local MongoDB connection
  PORT=8000                                     # Server port
```

## Running the Application

### Frontend Development Server

To start the React frontend:
```bash
cd MERN-BLOG
cd client
npm start
```
The frontend will run on `http://localhost:3000`

### Backend Server

To start the Node.js backend:
```bash
cd MERN-BLOG
cd server
npm start
```
The backend will run on `http://localhost:5000`

## Features

- User authentication (Register/Login)
- Create blog posts

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
