# Inventra AI - AI Powered Inventory Management System

## Live Demo

Frontend: https://inventra-ai-ai-inventory-management.vercel.app/

Backend API: https://inventraai-ai-inventory-management-system.onrender.com

---

## Project Overview

Inventra AI is a full-stack AI-powered Inventory Management System designed to help businesses manage inventory efficiently, track sales, analyze stock performance, forecast future demand, and gain AI-driven insights.

The application combines modern web technologies with AI features to provide a smart inventory management experience.

---

## Features

### Inventory Management

* Add new products
* Update product stock
* Delete products
* Search products
* Track available inventory

### Sales Management

* Sell products directly from inventory
* Automatic stock deduction after sales
* Sales history tracking
* Revenue calculation

### AI Demand Forecasting

* Analyze previous sales records
* Predict future product demand
* Help businesses make restocking decisions

### AI Inventory Assistant

* Chat-based inventory assistant
* Answer inventory-related queries
* Provide intelligent suggestions

### AI Insights

* Inventory analytics
* Product performance insights
* Business recommendations

### Data Visualization

* Product Stock Bar Chart
* Category Distribution Pie Chart
* Sales Trend Line Chart

### CSV Export

* Export inventory data into CSV format
* Easy reporting and analysis

### User Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* User Profile Management

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Recharts

### Backend

* Node.js
* Express.js
* JWT Authentication
* MongoDB

### Database

* MongoDB Atlas

### AI Services

* Google Gemini API
* FastAPI (Python)

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## System Architecture

User
↓
React Frontend
↓
Node.js + Express Backend
↓
MongoDB Atlas

AI Features
↓
FastAPI Service
↓
Gemini API

---

# Application Screenshots

## Home Page

<img width="1905" height="977" alt="image" src="https://github.com/user-attachments/assets/323dc157-87ec-43d9-a99a-9e5ed0a552c5" />


## Login Page

<img width="1920" height="972" alt="image" src="https://github.com/user-attachments/assets/e10a814d-5df3-4578-aa7b-c8977ca63fb5" />


## Dashboard

<img width="1902" height="971" alt="image" src="https://github.com/user-attachments/assets/f2180ca0-cb54-435d-b0a0-181895cbea44" />


## Product Management

<img width="1894" height="971" alt="image" src="https://github.com/user-attachments/assets/17b788bf-2031-4840-8a2b-ca05f58a61c0" />


## Analytics Dashboard

<img width="1904" height="969" alt="image" src="https://github.com/user-attachments/assets/730f654d-520f-48bd-88c1-b5d5a50e5e7c" />


## AI Assistant

<img width="1889" height="972" alt="image" src="https://github.com/user-attachments/assets/3e6b7d00-e695-46a3-b718-89d0cde6e618" />


## AI Insights

<img width="1903" height="969" alt="image" src="https://github.com/user-attachments/assets/55bf3b45-c00d-495c-9b86-6db096fa586f" />


## Installation Guide

### Clone Repository

```bash
git clone https://github.com/Sparsh10t/InventraAI-AI-inventory-management-system.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### AI Service Setup

```bash
cd ai-services
pip install fastapi uvicorn
uvicorn main:app --reload
```

---

## Environment Variables

Create a .env file inside backend directory.

Required Variables:

```env
PORT=
MONGODB_URL=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
GEMINI_API_KEY=
CORS_ORIGIN=
```

---

## Future Improvements

* OCR Invoice Scanner
* Email Notifications
* Advanced AI Forecasting
* Multi-user Role Management
* Smart Restock Recommendations
* RAG-based AI Assistant

---

## Author

Sparsh Gupta

B.Tech CSE

AI, Full Stack Development and Intelligent Systems Enthusiast

---

## License

This project is developed for educational, learning, and portfolio purposes.
