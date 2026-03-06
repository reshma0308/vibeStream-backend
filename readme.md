# 🎬 VibeTube

A modern, full-stack video streaming platform built with the MERN stack, featuring user authentication, video upload/management, social interactions, and a sleek UI.

## 📋 Overview

VibeTube is a YouTube-like video streaming application that allows users to upload, watch, like, comment on videos, and subscribe to channels. Built with performance and user experience in mind, it features real-time updates, secure authentication, and cloud-based video storage.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication with access & refresh tokens
- HTTP-only cookies for enhanced security
- User registration with avatar and cover image upload
- Protected routes and middleware

### 🎥 Video Management
- Upload videos with thumbnails to Cloudinary
- View, edit, and delete your own videos
- Toggle video publish/unpublish status
- Video pagination and search functionality
- Automatic view count tracking
- Watch history management

### 👥 Social Features
- Subscribe/unsubscribe to channels
- View subscriber lists and subscribed channels
- Like/unlike videos
- Comment on videos
- User profiles with channel information

### 🎨 Frontend Features
- Responsive design with TailwindCSS
- Dark theme optimized for video viewing
- Collapsible sidebar navigation
- Real-time authentication state management
- Toast notifications for user feedback
- Video grid with lazy loading
- Custom video player

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Cloudinary** - Cloud storage for videos & images
- **Multer** - File upload handling
- **bcrypt** - Password hashing

### Frontend
- **React 18** with **TypeScript** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **TanStack Query** - Data fetching & caching
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **Axios** - HTTP client
- **Sonner** - Toast notifications

## 📁 Project Structure

```
vibeTube_new/
├── backend26/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Auth & file upload
│   │   ├── utils/           # Helper functions
│   │   └── db/              # Database connection
│   └── public/temp/         # Temporary file storage
│
└── LearnifyFrontend/video-stream-hub/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── contexts/        # Auth context
    │   ├── services/        # API services
    │   ├── types/           # TypeScript types
    │   └── hooks/           # Custom hooks
    └── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend26
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the development server:
```bash
npm run dev
```

Server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd LearnifyFrontend/video-stream-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

Application will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user

### Videos
- `GET /api/v1/videos` - Get all videos (with pagination & search)
- `GET /api/v1/videos/:id` - Get video by ID
- `POST /api/v1/videos` - Upload video (protected)
- `PATCH /api/v1/videos/:id` - Update video (protected)
- `DELETE /api/v1/videos/:id` - Delete video (protected)
- `PATCH /api/v1/videos/:id/toggle-publish` - Toggle publish status (protected)

### Subscriptions
- `GET /api/v1/subscriptions` - Get subscribed channels
- `POST /api/v1/subscriptions/:channelId` - Toggle subscription

### Users
- `GET /api/v1/users/:id` - Get user profile

## 🎯 Features in Development
- Video recommendations based on watch history
- Advanced search with filters
- Video playlists
- Live streaming support
- Real-time notifications

## 👨‍💻 Author

**Reshma Kumari**

## 📄 License

ISC License

---

Made with ❤️ for learning full-stack development