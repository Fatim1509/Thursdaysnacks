# 🚀 Quick Start Guide

Get StreamFinder running in under 5 minutes!

## Prerequisites
- Node.js >= 16.0.0
- TMDB API Key (get it free at https://www.themoviedb.org/settings/api)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd webapp

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
TMDB_API_KEY=your_actual_tmdb_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
```

The default values should work for local development.

## Step 3: Get Your TMDB API Key

1. Go to https://www.themoviedb.org/
2. Create a free account
3. Navigate to Settings → API
4. Request an API key (choose "Developer")
5. Copy the "API Key (v3 auth)" value
6. Paste it into `backend/.env` as `TMDB_API_KEY`

## Step 4: Run the Application

Open two terminal windows:

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```
✅ Backend running at http://localhost:5000

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```
✅ Frontend running at http://localhost:3000

## Step 5: Test the Application

1. Open your browser to http://localhost:3000
2. You should see trending movies, TV shows, and anime
3. Try the search functionality
4. Click on any content to view details

## 🎉 Success!

Your StreamFinder app is now running locally!

## Common Issues

### "TMDB_API_KEY is not set"
- Make sure you created the `.env` file in the `backend` directory
- Verify the API key is correct (no spaces, quotes, or extra characters)

### Backend won't connect
- Check if port 5000 is already in use
- Change the `PORT` in `backend/.env` if needed

### Frontend can't reach backend
- Verify backend is running on http://localhost:5000
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env`

### No content showing
- Wait a few seconds for the API calls to complete
- Check the browser console for errors
- Verify your TMDB API key is valid

## Next Steps

- Read the full [README.md](README.md) for deployment instructions
- Customize the styling in `frontend/styles/globals.css`
- Add more features!

---

Need help? Open an issue on GitHub!
