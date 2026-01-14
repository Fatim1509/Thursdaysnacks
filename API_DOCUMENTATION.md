# 📘 Backend API Documentation

Complete documentation for the StreamFinder backend API.

## Base URL

**Development**: `http://localhost:5000`  
**Production**: `https://your-api.onrender.com`

## Authentication

No authentication required. API keys are handled server-side.

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Search endpoints**: 20 requests per 15 minutes per IP

## Standard Response Format

All endpoints return data in this unified structure:

```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": 12345,
      "title": "Content Title",
      "description": "Content description...",
      "poster": "https://image.tmdb.org/t/p/w500/poster.jpg",
      "rating": 8.5,
      "genres": ["Genre1", "Genre2"],
      "releaseDate": "2024-01-15",
      "trailer": "https://www.youtube.com/watch?v=videoId",
      "providers": ["Netflix", "Amazon Prime Video"]
    }
  ]
}
```

## Error Response Format

```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

---

## Movies Endpoints

### Get Trending Movies

Get the current trending movies for the week.

**Endpoint**: `GET /api/movies/trending`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/movies/trending
```

---

### Get Popular Movies

Get the most popular movies.

**Endpoint**: `GET /api/movies/popular`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/movies/popular
```

---

### Get Top Rated Movies

Get the top rated movies of all time.

**Endpoint**: `GET /api/movies/top-rated`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/movies/top-rated
```

---

### Get Movie Details

Get detailed information about a specific movie.

**Endpoint**: `GET /api/movies/:id`

**Parameters**:
- `id` (path, required): TMDB movie ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Example Movie",
    "description": "Full description...",
    "poster": "https://...",
    "rating": 8.5,
    "genres": ["Action", "Thriller"],
    "releaseDate": "2024-01-15",
    "trailer": "https://www.youtube.com/watch?v=...",
    "providers": ["Netflix", "Hulu"]
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/movies/550
```

---

### Search Movies

Search for movies by title.

**Endpoint**: `GET /api/movies/search`

**Parameters**:
- `q` (query, required): Search query string

**Response**:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

**Example**:
```bash
curl "http://localhost:5000/api/movies/search?q=inception"
```

**Rate Limit**: 20 requests per 15 minutes

---

## TV Shows Endpoints

### Get Trending TV Shows

Get the current trending TV shows for the week.

**Endpoint**: `GET /api/tv/trending`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/tv/trending
```

---

### Get Popular TV Shows

Get the most popular TV shows.

**Endpoint**: `GET /api/tv/popular`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/tv/popular
```

---

### Get TV Show Details

Get detailed information about a specific TV show.

**Endpoint**: `GET /api/tv/:id`

**Parameters**:
- `id` (path, required): TMDB TV show ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Example TV Show",
    "description": "Full description...",
    "poster": "https://...",
    "rating": 8.5,
    "genres": ["Drama", "Comedy"],
    "releaseDate": "2024-01-15",
    "trailer": "https://www.youtube.com/watch?v=...",
    "providers": ["HBO Max", "Netflix"]
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/tv/1399
```

---

### Search TV Shows

Search for TV shows by title.

**Endpoint**: `GET /api/tv/search`

**Parameters**:
- `q` (query, required): Search query string

**Response**:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

**Example**:
```bash
curl "http://localhost:5000/api/tv/search?q=breaking%20bad"
```

**Rate Limit**: 20 requests per 15 minutes

---

## Anime Endpoints

### Get Trending Anime

Get the current trending anime.

**Endpoint**: `GET /api/anime/trending`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/anime/trending
```

---

### Get Popular Anime

Get the most popular anime.

**Endpoint**: `GET /api/anime/popular`

**Response**:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

**Example**:
```bash
curl http://localhost:5000/api/anime/popular
```

---

### Get Anime Details

Get detailed information about a specific anime.

**Endpoint**: `GET /api/anime/:id`

**Parameters**:
- `id` (path, required): AniList anime ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Example Anime",
    "description": "Full description...",
    "poster": "https://...",
    "rating": 8.5,
    "genres": ["Action", "Fantasy"],
    "releaseDate": "2024",
    "trailer": "https://www.youtube.com/watch?v=...",
    "providers": ["Crunchyroll", "Funimation"]
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/anime/21
```

---

### Search Anime

Search for anime by title.

**Endpoint**: `GET /api/anime/search`

**Parameters**:
- `q` (query, required): Search query string

**Response**:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

**Example**:
```bash
curl "http://localhost:5000/api/anime/search?q=naruto"
```

**Rate Limit**: 20 requests per 15 minutes

---

## Health Check

Check if the API is running.

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Entertainment Discovery API"
}
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Bad Request (missing parameters) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## Data Sources

- **Movies & TV Shows**: The Movie Database (TMDB)
- **Anime**: AniList GraphQL API

## Notes

- All endpoints return cached data from external APIs
- Poster images are served via TMDB CDN
- Trailer links point to YouTube
- Providers list shows streaming availability in the US region only
- Some content may not have trailer or provider information available
