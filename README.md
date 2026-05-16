# Artist Portfolio Website

A full-stack web application for artists to showcase and sell their artwork. Built with React, Node.js, Express, and MongoDB.

## Features

- 🎨 **Artist Portfolio**: Beautiful gallery to showcase artwork
- 👤 **User Authentication**: Secure registration and login
- 📤 **Art Upload**: Easy-to-use interface for uploading artwork
- 🎯 **Dashboard**: Manage your artworks and track views
- 💰 **For Sale**: Mark artworks for sale and set prices
- 🔖 **Categories & Tags**: Organize artwork by category and tags
- 👥 **Artist Profiles**: Create professional artist profiles
- 🌐 **Social Links**: Link your social media and website
- 📱 **Responsive Design**: Works great on desktop and mobile

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your settings:
```
MONGODB_URI=mongodb://localhost:27017/artist-portfolio
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Database Setup

### Using MongoDB Locally
```bash
# Install MongoDB
# On macOS with Homebrew:
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Using MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## Project Structure

```
HassanElkess/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Art.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── art.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── ArtDetailPage.jsx
│   │   │   ├── ArtistPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Artwork
- `GET /api/art` - Get all artworks (with filters)
- `GET /api/art/:id` - Get single artwork
- `POST /api/art` - Create artwork (requires auth)
- `PUT /api/art/:id` - Update artwork (requires auth)
- `DELETE /api/art/:id` - Delete artwork (requires auth)
- `GET /api/art/artist/:artistId` - Get artworks by artist

## Usage

### For Users
1. Visit the website
2. Click "Register" to create an account
3. Fill in your profile information
4. Start uploading your artwork
5. Visit the gallery to browse other artists' work

### For Artists
1. Create an account
2. Update your profile with bio and social links
3. Upload your artwork with descriptions and tags
4. Set prices if you want to sell
5. Share your portfolio link with the world

## Development

### Running Both Servers

You can run both servers in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
The backend is ready to deploy as is. Update environment variables in production.

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend
The frontend uses environment variables via Vite's `import.meta.env`. The API proxy is configured in `vite.config.js`.

## Deployment

### Deploy Backend (e.g., Heroku, Railway, Render)
1. Set environment variables on your hosting platform
2. Push the backend code
3. Ensure MongoDB is accessible from your deployment

### Deploy Frontend (e.g., Vercel, Netlify, GitHub Pages)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update `CLIENT_URL` environment variable if needed

## Future Enhancements

- [ ] Payment integration for selling artwork
- [ ] Comments and ratings system
- [ ] Wishlist/favorites feature
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Artist collaboration features
- [ ] Image optimization and CDN integration
- [ ] Mobile app version
- [ ] Analytics and insights for artists

## Contributing

Feel free to fork and submit pull requests to improve the project!

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy creating! 🎨**