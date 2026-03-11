# Shario - Food Donation Bridge Platform

![Shario Banner](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Tech](https://img.shields.io/badge/Stack-MERN-purple)

**Shario** is a full-stack web application designed to connect people who have surplus food with those who need it, aiming to effectively reduce food waste and support communities. 

The platform provides a unified experience where anyone can be a donor or a receiver using a single, seamless account.

## 🌟 Key Features

*   **Unified Account System:** A single registration/login system for all users. No separate donor/receiver accounts.
*   **Secure Authentication:** JWT-based authentication with bcrypt password hashing and an OTP email verification flow (simulated).
*   **Smart Nearby Discovery:** Donations are automatically sorted by distance based on your browser's Geolocation API and backend geospatial indexing.
*   **Interactive Maps:** Visual map interfaces using React Leaflet for pinning donation locations and discovering nearby food drops.
*   **Donation Posting:** Donors can add food items with descriptions, quantities, expiry times, exact pickup coordinates, and images.
*   **Request System:** Receivers can instantly request a food item, alerting the donor.

## 💻 Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Glassmorphism & Modern UI)
*   React Router
*   Axios for API communication
*   React Leaflet for Interactive Maps

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose (with Geospatial Indexes)
*   JSON Web Tokens (JWT) for authentication
*   Bcrypt.js for secure password hashing
*   Nodemailer (Simulated for OTP)

## 🚀 Getting Started Locally

Follow these instructions to set up Shario on your local machine.

### Prerequisites
*   Node.js (v18+)
*   A MongoDB connection string (Local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/shario.git
cd shario
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
# or: node server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## 🌍 Deployment

**Backend:** Can be deployed to services like Render or Railway. Make sure to set the `MONGO_URI` and `JWT_SECRET` in the provider's Environment Variables settings.

**Frontend:** Can be deployed to Vercel or Netlify. Set `VITE_API_URL` to your live backend domain and ensure `package.json` build scripts are properly configured for the hosting platform.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---
*Built to reduce food waste and connect communities.*
