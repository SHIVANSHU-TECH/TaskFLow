# Deployment Instructions

## 1. Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a free cluster.
3. In "Database Access", create a user with a password.
4. In "Network Access", whitelist `0.0.0.0/0` (allow access from anywhere).
5. Click "Connect" -> "Connect your application".
6. Copy the connection string. Replace `<password>` with your user password.

## 2. Backend (Render / Railway)
**Using Render:**
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/).
3. Create a new **Web Service**.
4. Connect your GitHub repo.
5. **Root Directory**: `server`
6. **Build Command**: `npm install && npm run build` (or just `npm install` if running directly with ts-node in prod, but compiling to JS is better).
7. **Start Command**: `npm start`
8. **Environment Variables**: Add the following:
   - `MONGO_URI`: (Your MongoDB connection string)
   - `JWT_SECRET`: (A long random string)
   - `CLIENT_URL`: (Your future frontend URL, e.g., `https://my-app.vercel.app`)
   - `NODE_ENV`: `production`

## 3. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/).
2. "Add New Project" -> Import the same GitHub repo.
3. **Root Directory**: Edit and select `client`.
4. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://my-api.onrender.com/api`)
5. Click **Deploy**.

## Local Development
1. **Server**:
   - `cd server`
   - `npm install`
   - Create `.env` (see `.env.example`)
   - `npm run dev`
2. **Client**:
   - `cd client`
   - `npm install`
   - Create `.env.local` (see `.env.local.example`)
   - `npm run dev`
