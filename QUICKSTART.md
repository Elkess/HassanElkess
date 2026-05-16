# Quick Start Guide

Get the Artist Portfolio Website up and running in minutes!

## Option 1: Docker (Recommended)

The easiest way to run everything with one command:

```bash
docker-compose up
```

This will start:
- MongoDB on `localhost:27017`
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:5173`

## Option 2: Local Development

### Step 1: Install MongoDB

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

**Windows:**
Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (defaults should work for local development)
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## First Time Usage

1. **Register**: Go to `http://localhost:5173/register` and create an account
2. **Upload Art**: Click "Upload New Artwork" in the navbar
3. **View Gallery**: Visit the gallery to see all artwork
4. **Edit Profile**: Update your artist profile with bio and social links

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` (or `brew services start mongodb-community` on macOS)
- Check `MONGODB_URI` in `.env` file

### Port Already in Use
- Backend (5000): `lsof -i :5000` to find and kill process
- Frontend (5173): `lsof -i :5173` to find and kill process

### CORS Errors
- Ensure frontend URL matches `CLIENT_URL` in backend `.env`
- Default: `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/artist-portfolio
JWT_SECRET=your_secret_key_change_in_production
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## File Uploads

Uploaded artwork images are stored in:
- `backend/uploads/` (development)
- Consider using cloud storage (AWS S3, Cloudinary) for production

## Next Steps

- ✅ Set up accounts for multiple artists
- ✅ Upload artwork and test the gallery
- ✅ Try different categories and tags
- ✅ Test the dashboard and profile editing
- 📖 Read the main [README.md](README.md) for more details
- 🚀 Deploy to production when ready

## Support

If you encounter issues:
1. Check error messages in browser console (F12)
2. Check backend console for server errors
3. Verify all services are running
4. Check `.env` configuration

Happy creating! 🎨
