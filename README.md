# SHARIO - Food Sharing Platform

![Shario Banner](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Tech](https://img.shields.io/badge/Stack-MERN-purple)

Designed and developed a full-stack web application to facilitate food donation and sharing, reducing food waste through a user-friendly platform that connects donors and receivers in real-time. Implemented secure user authentication with JWT tokens and password hashing using bcrypt, enabling seamless registration and login processes for community engagement. Built RESTful APIs with Node.js and Express.js for backend operations, including food donation submissions, browsing available items, and claim management, while integrating MongoDB with Mongoose for efficient data storage and retrieval. Architected a responsive frontend using Vanilla JavaScript and Tailwind CSS, ensuring cross-device compatibility and dynamic user interfaces for donation forms, search functionalities, and profile management.

## 🌟 Key Features

*   **Unified Account System:** A single registration/login system for all users. No separate donor/receiver accounts.
*   **Secure Authentication:** JWT-based authentication with bcrypt password hashing and an OTP email verification flow.
*   **Smart Nearby Discovery:** Donations are automatically sorted by distance based on your browser's Geolocation API and backend geospatial indexing.
*   **Interactive Maps:** Visual map interfaces using React Leaflet for pinning donation locations and discovering nearby food drops.
*   **Donation Posting:** Donors can add food items with descriptions, quantities, expiry times, exact pickup coordinates, and images.
*   **Request System:** Receivers can instantly request a food item, alerting the donor.

## 💻 Tools & Tech Stack

*   **Frontend:** Vanilla JavaScript, React.js (Vite), HTML5, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Security & Utilities:** JWT, bcrypt, Multer
*   **Deployment:** GitHub Pages, Render, Vercel

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
