# Quote Tracker 📚

A production-minded full-stack application that enables users to capture, organize, and revisit meaningful quotes from books. Built with modern frontend architecture and a clean Rails API, focusing on real-world engineering decisions rather than tutorial-level implementation.

---

## 🌟 What Makes Quote Tracker Unique

* 🧠 **Designed for real user workflow** — capturing and revisiting ideas from reading, not just CRUD for its own sake
* ⚡ **Modern state management architecture** — clear separation between server state (TanStack Query) and client state (Zustand)
* 🏗️ Built with **production-style full-stack structure** (Rails API + React frontend)
* 🎯 Optimized for **portfolio signal** — clean, explainable technical decisions for interviews

---

## 🚀 Key Features

* 🔐 Session-based authentication (signup, login, logout)
* ✍️ Full CRUD for quotes
* 📚 User-specific quote collections
* 🌍 Public quotes feed (no authentication required)
* ⚡ Fast UI with cached server data (TanStack Query)
* 🎨 Clean and responsive UI using Tailwind CSS

---

## 🧱 Tech Stack

**Frontend**

* React
* Vite
* Zustand (client/UI state)
* TanStack Query (server state, caching)
* Tailwind CSS

**Backend**

* Ruby on Rails (API mode)
* RESTful routing
* Active Record

---

## 🏗️ System Design Highlights

* Separated **server state and client state**:
  * TanStack Query → API data fetching, caching, synchronization
  * Zustand → UI state (filters, modals, local interactions)

* Designed a **clean Rails API structure**:
  * Controllers focused on request handling
  * Models responsible for data relationships and validation

* Implemented **session-based authentication using cookies**:
  * Simple and secure approach for full-stack apps

* Built a **clear separation between public and private resources**:
  * `/api/quotes` → authenticated user data
  * `/api/public/quotes` → public access

---

## ⚡ Performance & Scalability

* Reduced redundant API calls via **client-side caching (TanStack Query)**
* Improved perceived performance with **background refetching**
* Lightweight global state using Zustand avoids unnecessary re-renders
* Structured backend for easy extension and scaling

---

## 🔌 API Overview

All `/api/quotes` endpoints require authentication via session cookies.

---

### Health

* `GET /api/health` — Check if API is running

---

### Authentication

* `POST /api/signup` — Register a new user  
* `POST /api/login` — Authenticate user  
* `DELETE /api/logout` — End session  
* `GET /api/me` — Get current authenticated user  

---

### Quotes (Authenticated)

* `GET /api/quotes` — Get all user quotes  
* `POST /api/quotes` — Create a quote  
* `GET /api/quotes/:id` — Get quote by ID  
* `PATCH /api/quotes/:id` — Update quote  
* `DELETE /api/quotes/:id` — Delete quote  

---

### Public Quotes

* `GET /api/public/quotes` — Get public quotes (no auth required)

---

## ⚔️ Challenges & Solutions

* **Separating server vs client state clearly**
  → Used TanStack Query + Zustand instead of overloading one tool

* **Keeping frontend data in sync with backend**
  → Leveraged query invalidation and caching strategies

* **Designing a clean API for a React frontend**
  → Used RESTful Rails routes with clear resource boundaries

* **Avoiding overengineering while staying scalable**
  → Chose simple session-based auth instead of JWT complexity

---

## 🚀 Getting Started

### Backend

```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails server