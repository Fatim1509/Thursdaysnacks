# 🌐 Deployment Guide

Complete guide to deploying StreamFinder to production using free hosting platforms.

## Overview

- **Backend**: Deploy to Render (Free Tier)
- **Frontend**: Deploy to Vercel (Free Tier)
- **Total Cost**: $0/month
- **Deployment Time**: ~15 minutes

---

## 📦 Prerequisites

Before deploying, ensure you have:

- [x] GitHub/GitLab account
- [x] TMDB API Key (get at https://www.themoviedb.org/settings/api)
- [x] Render account (sign up at https://render.com)
- [x] Vercel account (sign up at https://vercel.com)

---

## Part 1: Push Code to GitHub

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (name: `streamfinder` or any name)
3. Keep it public or private (both work)
4. Don't initialize with README (we already have one)

### 1.2 Push Your Code

```bash
cd webapp

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: StreamFinder entertainment discovery app"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## Part 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Log in to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** and authorize GitHub
4. Select your `streamfinder` repository

### 2.2 Configure Service

Fill in the following settings:

**Basic Settings**:
- **Name**: `streamfinder-api` (or any name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`

**Build & Deploy**:
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type**:
- Select **"Free"** (0$ / month)

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `TMDB_API_KEY` | your_actual_tmdb_api_key |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | Leave blank for now (will update after frontend deployment) |

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://streamfinder-api.onrender.com`
4. **SAVE THIS URL** - you'll need it for frontend deployment

### 2.5 Test Backend

Visit your backend URL:
```
https://streamfinder-api.onrender.com
```

You should see the API welcome message with endpoint documentation.

Test an endpoint:
```
https://streamfinder-api.onrender.com/api/movies/trending
```

You should see JSON data with trending movies.

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Log in to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select `streamfinder` repository

### 3.2 Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: Click **"Edit"** and set to `frontend`

**Build Settings**:
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

### 3.3 Add Environment Variable

Click **"Environment Variables"**

Add this variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your backend URL from Render (e.g., `https://streamfinder-api.onrender.com`) |

**IMPORTANT**: Remove any trailing slashes from the URL.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get URLs like:
   - Production: `https://streamfinder-xyz.vercel.app`
   - Preview: Various URLs for branches

### 3.5 Test Frontend

1. Visit your Vercel URL: `https://streamfinder-xyz.vercel.app`
2. You should see the StreamFinder homepage
3. Test browsing movies, TV shows, and anime
4. Test the search functionality

---

## Part 4: Update Backend CORS

### 4.1 Add Frontend URL to Backend

1. Go back to Render dashboard
2. Select your `streamfinder-api` service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update its value to your Vercel URL: `https://streamfinder-xyz.vercel.app`
6. Click **"Save Changes"**

The backend will automatically redeploy with updated CORS settings.

---

## Part 5: Custom Domain (Optional)

### 5.1 Frontend Custom Domain (Vercel)

1. In Vercel dashboard, select your project
2. Go to **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

### 5.2 Backend Custom Domain (Render)

1. In Render dashboard, select your service
2. Go to **"Settings"** → **"Custom Domain"**
3. Add your custom domain
4. Follow Render's DNS configuration instructions

**After adding custom domain**:
- Update `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Update `FRONTEND_URL` in Render environment variables
- Redeploy both services

---

## 🎉 Deployment Complete!

Your StreamFinder app is now live!

**URLs**:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`

---

## 📝 Post-Deployment Checklist

- [ ] Test all pages (Home, Movies, TV, Anime, Search)
- [ ] Test search functionality
- [ ] Click on content items to view details
- [ ] Test trailer modal
- [ ] Verify "Where to Watch" providers appear
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Monitor Render logs for backend errors

---

## 🔧 Troubleshooting

### Frontend shows "Failed to fetch"

**Problem**: Frontend can't connect to backend

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` in Vercel is correct
2. Make sure there's no trailing slash
3. Check backend is running on Render
4. Verify backend CORS settings include your frontend URL

---

### Backend returns 429 (Too Many Requests)

**Problem**: Rate limit exceeded

**Solution**:
1. Wait 15 minutes for rate limit to reset
2. Consider increasing rate limits in `backend/src/middlewares/rateLimiter.js`
3. For production, consider upgrading to paid TMDB API tier

---

### Images not loading

**Problem**: Image domains not allowed

**Solution**:
1. Check `frontend/next.config.js` includes image domains
2. Verify these domains are listed:
   - `image.tmdb.org`
   - `s4.anilist.co`

---

### Render service sleeping (Free tier)

**Problem**: First request takes 30+ seconds

**Solution**:
- This is normal for Render's free tier
- Service sleeps after 15 minutes of inactivity
- First request wakes it up (cold start)
- Consider upgrading to paid tier for always-on service

---

### Environment variables not updating

**Problem**: Changes to environment variables don't apply

**Solution**:
1. After changing environment variables, you must redeploy
2. In Render: Service will auto-redeploy
3. In Vercel: Go to Deployments → Click "..." → "Redeploy"

---

## 🚀 Updating Your Deployment

### Update Backend

1. Make changes to backend code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```
3. Render auto-deploys from `main` branch

### Update Frontend

1. Make changes to frontend code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```
3. Vercel auto-deploys from `main` branch

---

## 📊 Monitoring

### Render (Backend)

- View logs: Dashboard → Select service → "Logs" tab
- Monitor metrics: Dashboard → Select service → "Metrics" tab
- Check health: Visit `/health` endpoint

### Vercel (Frontend)

- View deployment logs: Dashboard → Select project → "Deployments"
- Monitor analytics: Dashboard → Select project → "Analytics"
- Check runtime logs: Dashboard → Select project → "Logs"

---

## 💰 Costs & Limits

### Render Free Tier
- ✅ 750 hours/month (enough for one always-on service)
- ✅ Automatic SSL
- ⚠️ Service sleeps after 15 minutes of inactivity
- ⚠️ 100 GB bandwidth/month

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL and CDN
- ✅ Serverless functions

### TMDB API Free Tier
- ✅ 40,000 requests per day
- ✅ No credit card required

---

## 🎓 Best Practices

1. **Environment Variables**: Never commit API keys to Git
2. **CORS**: Always specify exact frontend URL, not wildcard `*`
3. **Rate Limiting**: Keep rate limits enabled in production
4. **Error Handling**: Monitor logs for errors
5. **Updates**: Keep dependencies updated for security
6. **Backups**: Regularly backup your code to GitHub

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [AniList API Documentation](https://anilist.gitbook.io/anilist-apiv2-docs/)

---

**Need help?** Open an issue on GitHub or refer to the main [README.md](README.md)
