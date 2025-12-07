# MERN Stack Task Manager Project

## Project Overview
This project is a full-stack Task Management application built using the **MERN** (MongoDB, Express.js, React, Node.js) stack. It features secure user authentication (via Firebase & JWT), a responsive UI with Tailwind CSS, and a robust REST API backend.

## 🛠️ Technology Stack

## 📌 Problem Statement
The goal of this assignment was to build a comprehensive task management system that demonstrates proficiency in full-stack development. The system needed to address the following requirements:
1.  **Secure Authentication**: Implement robust user signup and login mechanisms, including social login (Google).
2.  **Task Management**: Users should be able to create, view, edit, and delete tasks.
3.  **Responsive Design**: The application must provide a seamless experience across desktop and mobile devices.
4.  **State Management**: Efficient handling of application state between the client and server.

## 💡 My Solution
To address these requirements, I engineered a **MERN Stack** application that emphasizes scalability, security, and user experience.

### Key Implementation Details:
-   **Hybrid Authentication**: Integrated **Firebase** for secure Google OAuth handling on the client side, while managing session security with **JWT (JSON Web Tokens)** on the backend. This ensures a low-friction login experience without compromising security.
-   **Modern UI/UX**: Utilized **React 19** and **Tailwind CSS** to create a dynamic, mobile-first interface. The design features glassmorphism effects and smooth transitions to enhance perceived performance.
-   **Robust Backend**: Built a RESTful API with **Express.js** and **TypeScript**, enforcing strict data validation with **Zod** to prevent malformed data from reaching the **MongoDB** database.
-   **Developer Experience**: Configured a proxy server in Vite to eliminate CORS issues during development and ensure smooth client-server communication.


### Frontend (Client)
-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **State Management**: React Context API
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Backend (Server)
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
-   **Validation**: [Zod](https://zod.dev/)
-   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [BcryptJS](https://www.npmjs.com/package/bcryptjs)
-   **Utilities**: Nodemon, Dotenv, Cookie-parser, Cors

---

## 📂 Project Structure

### `/client`
The frontend application.
-   `src/components`: Reusable UI components.
-   `src/context`: React Context providers (e.g., AuthContext).
-   `src/pages`: Main application views (Login, Register, Dashboard).
-   `src/services`: API service functions.
-   `src/firebase.ts`: Firebase configuration and initialization.

### `/server`
The backend API.
-   `src/config`: Configuration files (Database connection).
-   `src/controllers`: Request logic handlers.
-   `src/middleware`: Express middleware (Auth, Validation).
-   `src/models`: Mongoose data schemas.
-   `src/routes`: API route definitions.
-   `src/server.ts`: Entry point.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   MongoDB Database (Local or Atlas URI)
-   Firebase Project (for Google Auth)

### 1. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Create a `.env` file in the `server` root.
    -   Add the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
        CLIENT_URL=http://localhost:5173
        ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Create a `.env` file in the `client` root.
    -   Add your Firebase credentials (prefixed with `VITE_`):
        ```env
        VITE_FIREBASE_API_KEY=your_api_key
        VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
        VITE_FIREBASE_PROJECT_ID=your_project_id
        VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_FIREBASE_APP_ID=your_app_id
        ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 🔑 Authentication
The app uses a hybrid authentication approach:
1.  **Google Auth**: Handled client-side via Firebase. The Firebase ID token or user details are sent to the backend to create/verify the user.
2.  **Email/Password**: Handled directly via the backend API with JWT sessions.

## 📝 Features
-   User Registration & Login
-   Google OAuth Integration
-   Create, Read, Update, Delete (CRUD) Tasks
-   Protected Routes
-   Responsive Design

