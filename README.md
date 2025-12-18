# Bhats Hotel Booking App

A modern, premium hotel booking application built with **React**, **Vite**, **Node.js**, and **MongoDB**.

## Features
-   **React Frontend**: Fast, responsive SPA with a deep navy & gold luxury theme.
-   **Real-time Availability**: Server-side checks prevent double bookings.
-   **Secure Auth**: Firebase Authentication (Email/Password + Google).
-   **Backend**: Express + MongoDB for robust data handling.

## Prerequisites
1.  **Node.js** (v16 or higher)
2.  **MongoDB** (Local or Atlas URL)
3.  **Firebase Project** (Configured in `src/firebase-config.js`)

## Installation & Setup

### 1. Clone & Install Dependencies
The project has a unified install script for both frontend and backend.

**Windows (PowerShell)**:
```powershell
# Open terminal in project root
npm run install:all
```

**Mac/Linux (Terminal)**:
```bash
# Open terminal in project root
npm run install:all
```

### 2. Configure Environment
Ensure you have a `.env` file in the **root** directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Run the Application
You need to run both the Backend (API) and Frontend (UI).

**Step 1: Start Backend**
```bash
# Open a new terminal
npm run server
```

**Step 2: Start Frontend**
```bash
# Open another terminal
npm run dev
```

Visit `http://localhost:5173` to view the app!

## Project Structure
-   `src/` - React Frontend Code
    -   `components/` - Reusable UI (Navbar, Footer, etc.)
    -   `pages/` - Main views (Home, Auth)
    -   `assets/` - Images and static files
-   `server/` - Node.js Backend API
