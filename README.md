# NovelNest — Online Book Store

A premium, responsive online bookstore built with **React (Vite)**, **Tailwind CSS**, **Express.js**, and **MySQL** for a college assignment.

---

## 📦 Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React (Vite), Tailwind CSS, Framer Motion   |
| Backend    | Node.js, Express.js                         |
| Database   | MySQL                                        |
| Libraries  | React Router, Axios, React Icons, SweetAlert2|

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL (running locally)

---

### 1. Database Setup

Open MySQL CLI or a tool like MySQL Workbench and run:

```sql
-- (paste the contents of server/database_setup.sql here)
```

Or run directly:

```bash
mysql -u root -p < server/database_setup.sql
```

---

### 2. Backend Setup

```bash
cd server
# Copy and edit .env
cp .env.example .env
# Edit .env with your MySQL credentials

node server.js
```

Server runs on **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 📁 Project Structure

```
ASS_6_anti/
├── client/              # React Frontend
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route pages
│       ├── services/    # Axios API service
│       └── data/        # Static book data
└── server/              # Express Backend
    ├── database/        # MySQL connection
    ├── routes/          # API routes
    └── server.js        # Main entry point
```

---

## 🌐 API Endpoints

| Method | Route              | Description        |
|--------|--------------------|--------------------|
| POST   | /api/auth/register | Register a new user|
| POST   | /api/auth/login    | Login an existing user |
| GET    | /api/books         | Get all books      |

---

## 🎨 Features

- **Dark Theme** with glassmorphism design
- **Framer Motion** animations and page transitions
- **Responsive** — 4-column desktop, 2-column tablet, 1-column mobile
- **Book Catalogue** with search, genre filter, and sort
- **Login / Registration** with form validation and SweetAlert2 notifications
- **Password Strength Indicator** on register page
- **Animated Statistics Counter**
- **Back to Top** button
- **Custom Scrollbar**
- **404 Not Found** page
