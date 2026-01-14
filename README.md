# 🎬 StreamFinder - Entertainment Discovery Platform

A complete, production-ready entertainment discovery web application that helps users find where to watch movies, TV shows, and anime on legal streaming platforms.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Legal & Copyright](#legal--copyright)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

StreamFinder is a **metadata-only** entertainment discovery platform that:
- ✅ Helps users discover movies, TV shows, and anime
- ✅ Shows where content is legally available to watch
- ✅ Provides detailed information including ratings, genres, trailers
- ✅ Redirects users to official streaming platforms only
- ❌ **Does NOT** stream or host any video content
- ❌ **Does NOT** require user accounts or store personal data
- ❌ **Does NOT** link to piracy websites

## ✨ Features

### For Users
- **Browse Content**: Explore trending, popular, and top-rated movies, TV shows, and anime
- **Search**: Find specific content across all categories
- **Detailed Information**: View ratings, genres, release dates, descriptions, and trailers
- **Legal Streaming**: See which official platforms have the content available
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Netflix-style cinematic interface

### Technical Features
- **RESTful API**: Clean backend architecture with Express.js
- **API Gateway Pattern**: Backend protects API keys and normalizes data
- **Rate Limiting**: Prevents API abuse
- **Security Headers**: Helmet.js for HTTP security
- **Error Handling**: Centralized error management
- **No Authentication Required**: Simple, frictionless experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: Vercel (Free Tier)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: Helmet, CORS, express-rate-limit
- **HTTP Client**: Axios
- **Deployment**: Render (Free Tier)

### Data Sources
- **Movies & TV Shows**: The Movie Database (TMDB) API
- **Anime**: AniList GraphQL API

## 📁 Project Structure

```
webapp/
├── backend/
│   ├── src/
│   │   ├── routes/           # API route definitions
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # External API integrations
│   │   ├── middlewares/      # Security, rate limiting, error handling
│   │   ├── utils/            # Data formatters and utilities
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Server startup
│   ├── .env.example          # Environment variables template
│   └── package.json
├── frontend/
│   ├── components/           # Reusable React components
│   ├── pages/                # Next.js pages
│   ├── services/             # API client
│   ├── styles/               # Global CSS and Tailwind
│   ├── .env.example          # Environment variables template
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- TMDB API Key (free at https://www.themoviedb.org/settings/api)

### Clone the Repository
```bash
git clone <repository-url>
cd webapp
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your TMDB_API_KEY
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000)
```

## ⚙️ Configuration

### Backend (.env)
```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Getting a TMDB API Key
1. Create a free account at https://www.themoviedb.org/
2. Go to Settings > API
3. Request an API key (choose "Developer" option)
4. Copy the API Key (v3 auth) to your .env file

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### Production Mode

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm run build
npm start
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create Account**: Sign up at https://render.com
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repository**: Link your GitHub/GitLab repository
4. **Configuration**:
   - **Name**: streamfinder-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Add Environment Variable**: `TMDB_API_KEY` = your key
   - **Add Environment Variable**: `FRONTEND_URL` = your frontend URL
5. **Deploy**: Click "Create Web Service"

### Frontend Deployment (Vercel)

1. **Create Account**: Sign up at https://vercel.com
2. **Import Project**: Click "Add New..." → "Project"
3. **Connect Repository**: Link your GitHub/GitLab repository
4. **Configuration**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Environment Variable**: `NEXT_PUBLIC_API_URL` = your backend URL
5. **Deploy**: Click "Deploy"

### Post-Deployment

1. Update frontend `.env` with backend URL
2. Update backend `.env` with frontend URL
3. Redeploy if needed

## 📚 API Documentation

### Base URL
```
http://localhost:5000 (development)
https://your-api.onrender.com (production)
```

### Endpoints

#### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/top-rated` - Get top rated movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/search?q=query` - Search movies

#### TV Shows
- `GET /api/tv/trending` - Get trending TV shows
- `GET /api/tv/popular` - Get popular TV shows
- `GET /api/tv/:id` - Get TV show details
- `GET /api/tv/search?q=query` - Search TV shows

#### Anime
- `GET /api/anime/trending` - Get trending anime
- `GET /api/anime/popular` - Get popular anime
- `GET /api/anime/:id` - Get anime details
- `GET /api/anime/search?q=query` - Search anime

### Standard Response Format
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": 12345,
      "title": "Example Movie",
      "description": "Movie description...",
      "poster": "https://image.tmdb.org/t/p/w500/poster.jpg",
      "rating": 8.5,
      "genres": ["Action", "Thriller"],
      "releaseDate": "2024-01-15",
      "trailer": "https://www.youtube.com/watch?v=...",
      "providers": ["Netflix", "Amazon Prime Video"]
    }
  ]
}
```

## ⚖️ Legal & Copyright

### Important Disclaimers

**This application:**
- Is a metadata discovery and aggregation platform only
- Does NOT host, stream, or provide downloads for any content
- Does NOT link to piracy or illegal streaming websites
- Only redirects users to official, legal streaming platforms
- Complies with TMDB Terms of Service and AniList Terms of Service

**All content is property of their respective owners:**
- Movie and TV show data: © The Movie Database (TMDB)
- Anime data: © AniList
- All posters, images, and media: © Their respective copyright holders

**Fair Use Statement:**
- This application uses publicly available metadata for informational purposes
- Posters and images are used for identification and commentary
- No copyrighted video content is hosted or streamed

### Attribution
- Movies & TV Shows powered by The Movie Database (TMDB)
- Anime data from AniList

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow existing code conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing comprehensive movie and TV show data
- **AniList** for providing anime data through their GraphQL API
- **Netflix** for UI/UX inspiration
- All open-source contributors

## 📞 Contact & Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🔮 Future Enhancements

- [ ] User accounts and watchlists (optional)
- [ ] Personalized recommendations
- [ ] Multi-language support
- [ ] More streaming regions
- [ ] Similar content suggestions
- [ ] Movie/TV show trailers collection

---

**Note**: This is a legal, metadata-only discovery platform. We do not host, stream, or provide downloads for any content. All content is the property of their respective owners.
