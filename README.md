# Digital Warranty & Receipt Manager 

A full-stack web application that allows users to digitally manage product warranties by storing purchase information and automatically calculating warranty expiration dates. The system is implemented as part of a Master’s-level software engineering project and demonstrates modern web application architecture, integration, and testing practices.

## 📌 Project Overview

Managing physical warranty cards and paper receipts is inconvenient and error-prone. This project addresses the problem by providing a centralized digital platform where users can store warranty-related information and track warranty validity periods.

The application is implemented using a client–server architecture with a RESTful backend and a modern single-page frontend.

## 🏗️ Architecture

The system follows a layered full-stack architecture:

Frontend: React + TypeScript (Vite)

Backend: Node.js + Express

Database: PostgreSQL (via Sequelize ORM)

API Communication: REST (JSON over HTTP)

Frontend and backend are developed and executed as separate services and communicate through clearly defined API endpoints.

## 🛠️ Technology Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

Axios / Fetch-based API abstraction

Backend

Node.js

Express.js

Sequelize ORM

PostgreSQL

bcrypt (password hashing)

Tooling

Git & GitHub (version control)

VS Code

npm

## ✨ Core Features

User registration with input validation

Warranty creation with automatic expiration date calculation

Client-side and server-side validation

RESTful API design

Modular and maintainable code structure

Prepared for future authentication-based authorization

## 📂 Project Structure
digital-warranty-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.tsx
│   ├── public/
│   └── package.json
│
├── docs/
│   └── diagrams/
│
└── README.md

## 🚀 Getting Started
Prerequisites

Node.js (v18+ recommended)

npm

PostgreSQL

Backend Setup
cd backend
npm install
npm run dev


The backend server will start on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


The frontend will be available at:

http://localhost:8080

🔌 API Endpoints (Overview)
Authentication

POST /api/auth/register – Register a new user

Warranties

POST /api/warranties – Create a new warranty

GET /api/warranties – Retrieve all warranties

## 🧪 Testing

Testing was performed manually using:

Browser-based frontend interaction

API testing tools (e.g., Postman / Thunder Client)

Validated scenarios include:

Successful and invalid user registration

Warranty creation with valid input

Rejection of invalid or incomplete warranty data

Correct warranty expiration date calculation

## ⚠️ Limitations

Warranty creation is not restricted by authentication in the current implementation.

A fixed user identifier is used for warranty records to simplify development.

Receipt upload and notification features are planned but not implemented.

These limitations are intentional and documented, with the architecture prepared for future extensions.

## 🔮 Future Enhancements

JWT-based authentication and authorization

User-specific warranty management

Receipt upload and storage

Warranty expiration notifications

Deployment to a cloud platform

## 🎓 Academic Context

This project was developed as part of a Master’s-level software engineering course. The focus lies on clean architecture, maintainability, integration, and systematic testing rather than production deployment.

## 👤 Author

Sujeet Kumar
Master’s Student – Software Engineering