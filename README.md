# Bhats Hotel Booking

A full-stack hotel booking application with admin management and email notifications.

## Project Structure
-   `frontend/`: React + Vite application (The website user sees)
-   `backend/`: Node.js + Express API (Handles bookings, database, emails)

## Prerequisites
-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a cloud URI)

## Getting Started

You need to run the **Backend** and **Frontend** in separate terminals.

### 1. Start the Backend
Open a terminal and run:
```bash
cd backend
npm install   # Only needed first time
npm run dev
```
*The server will start on http://localhost:3000*

### 2. Start the Frontend
Open a **new** terminal (keep the backend running) and run:
```bash
cd frontend
npm install   # Only needed first time
npm run dev
```
*The website will open at http://localhost:5173* (or similar)

## Deployment

### Backend (Render/Heroku)
Deploy the `backend` folder. ensure `build` command is `npm install` and start command is `node server.js`.

### Frontend (Vercel/Netlify)
Deploy the `frontend` folder.
-   Root Directory: `frontend`
-   Build Command: `npm run build`
-   Output Directory: `dist`
