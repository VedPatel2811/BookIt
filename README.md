# BookIt

A premium residential facility booking platform that lets residents browse, search, and book shared amenities — with real-time slot locking, daily booking limits, and a full booking history dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Option 1 — Full Stack with Docker (Recommended)](#option-1--full-stack-with-docker-recommended)
  - [Option 2 — Frontend Dev Server + Docker Backend](#option-2--frontend-dev-server--docker-backend)
  - [Option 3 — Deploy Each Service Independently](#option-3--deploy-each-service-independently)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [How Slot Locking Works](#how-slot-locking-works)

---

## Overview

BookIt is a full-stack web application built for residential societies and premium estates. Residents can sign up, log in, and book time slots at shared facilities like a gymnasium, cricket nets, swimming pool, and private theater. The system enforces per-facility daily booking limits per user and uses Redis to temporarily lock a slot while a user is filling in their booking details — preventing double bookings in real time.

---

## Features

- **Authentication** — JWT-based signup, login, and logout with token blacklisting via Redis
- **Facility Gallery** — Browse all facilities with search and session-duration filters
- **Smart Slot Generation** — Time slots are generated dynamically based on each facility's session duration (e.g. 1 hr, 90 mins, 2 hrs, 3 hrs)
- **Real-time Slot Locking** — When a user selects a slot, it is locked in Redis for 15 minutes so no other user can book it simultaneously
- **Daily Booking Limits** — Each facility enforces a per-user daily session cap (e.g. max 2 sessions/day at Cricket Nets)
- **Booking Confirmation** — Bookings are saved to PostgreSQL with a booker name and confirmation email
- **My Bookings Dashboard** — Users can see all their upcoming and past bookings on the dashboard
- **Complaints** — Residents can raise and track maintenance complaints
- **Visitors** — Register and track expected visitors
- **Maintenance** — View society maintenance dues and transaction history
- **Responsive UI** — Works on mobile (bottom nav) and desktop (sidebar)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, React Router v7 |
| Backend | Python 3.11, FastAPI, SQLAlchemy, Pydantic v2, python-jose (JWT) |
| Database | PostgreSQL 15 |
| Cache / Locking | Redis 7 |
| Containerisation | Docker, Docker Compose |

---

## Project Structure

```
BookIt/
├── docker-compose.yml        ← Runs all services together locally
├── README.md
│
├── backend/                  ← FastAPI REST API
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py       ← /auth — signup, login, logout, /me
│   │   │   ├── facilities.py ← /facilities — list, slot status, lock, book
│   │   │   ├── bookings.py   ← /bookings — my bookings
│   │   │   ├── complaints.py ← /complaints
│   │   │   ├── visitors.py   ← /visitors
│   │   │   └── maintenance.py← /maintenance
│   │   ├── models.py         ← SQLAlchemy ORM models
│   │   ├── schemas.py        ← Pydantic request/response schemas
│   │   ├── database.py       ← SQLAlchemy engine + session
│   │   ├── deps.py           ← JWT auth dependency
│   │   ├── redis_client.py   ← Redis connection
│   │   ├── utils.py          ← Password hashing, JWT creation
│   │   └── main.py           ← FastAPI app + CORS + router registration
│   ├── Dockerfile
│   ├── docker-compose.yml    ← Deploy API standalone
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
│
├── database/                 ← PostgreSQL
│   ├── docker-compose.yml    ← Deploy DB standalone
│   ├── .env
│   ├── .env.example
│   └── README.md
│
├── redis/                    ← Redis
│   ├── docker-compose.yml    ← Deploy Redis standalone
│   ├── .env
│   ├── .env.example
│   └── README.md
│
└── frontend/                 ← React + Vite SPA
    ├── src/
    │   ├── pages/            ← Dashboard, Facilities, FacilityBooking, Login, Signup, ...
    │   ├── components/       ← UI, dashboard, facility components
    │   ├── store/            ← Redux slices (auth, facilities, bookings, dashboard)
    │   ├── utils/            ← dateUtils (slot generation, duration parsing)
    │   └── lib/              ← API client, AuthContext
    ├── .env
    └── .env.example
```

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [Node.js 18+](https://nodejs.org/) — only needed if running the frontend outside Docker

---

### Option 1 — Full Stack with Docker (Recommended)

Runs the API, PostgreSQL, and Redis together on a shared Docker network. The frontend runs separately as a dev server.

**Step 1 — Start the backend services**

```bash
# From the BookIt/ root
docker-compose up --build
```

This starts:
| Service | URL |
|---|---|
| FastAPI API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

Database tables are created automatically on first startup.

**Step 2 — Start the frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

### Option 2 — Frontend Dev Server + Docker Backend

Same as Option 1 but useful if you want hot-reload on the frontend while the backend runs in Docker.

Make sure `frontend/.env` contains:
```
VITE_API_URL=http://localhost:8000
```

---

### Option 3 — Deploy Each Service Independently

Each service has its own `docker-compose.yml` and can be deployed to any host independently.

**1. Deploy the Database**
```bash
cd database
cp .env.example .env
# Edit .env with your credentials
docker-compose up -d
```

**2. Deploy Redis**
```bash
cd redis
cp .env.example .env
docker-compose up -d
```

**3. Deploy the Backend**
```bash
cd backend
cp .env.example .env
# Set DATABASE_URL to point to your deployed PostgreSQL host
# Set REDIS_URL to point to your deployed Redis host
docker-compose up -d
```

> When running the backend standalone, use `host.docker.internal` as the hostname if the DB and Redis are running on the same machine but in separate containers. For cloud deployments, use the actual service hostname.

---

## Environment Variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/bookit_db` |
| `REDIS_URL` | Redis connection string | `redis://host:6379/0` |
| `SECRET_KEY` | JWT signing secret (generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`) | `yv9CmjG22fB6...` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT expiry in minutes | `30` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:5173` |
| `API_PORT` | Port to expose the API on | `8000` |

### `database/.env`

| Variable | Description |
|---|---|
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |
| `POSTGRES_PORT` | Host port (default: 5432) |

### `redis/.env`

| Variable | Description |
|---|---|
| `REDIS_PORT` | Host port (default: 6379) |

### `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## API Reference

All protected routes require a `Bearer` token in the `Authorization` header.

### Authentication — `/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | No | Register a new user |
| POST | `/auth/login` | No | Login, returns JWT token |
| POST | `/auth/logout` | Yes | Blacklist the current token |
| GET | `/auth/me` | Yes | Get current user info |

### Facilities — `/facilities`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/facilities` | No | List all active facilities |
| GET | `/facilities/{id}/slots?booking_date=YYYY-MM-DD` | Yes | Get booked and locked slots for a date |
| POST | `/facilities/{id}/slots/{slot_time}/lock?booking_date=` | Yes | Acquire a 15-min Redis lock on a slot |
| DELETE | `/facilities/{id}/slots/{slot_time}/lock?booking_date=` | Yes | Release a slot lock |
| POST | `/facilities/book` | Yes | Create a confirmed booking |

### Bookings — `/bookings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/bookings/my` | Yes | Get all bookings for the current user |

### Other

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/complaints` | No | List complaints |
| POST | `/complaints` | No | Create a complaint |
| GET | `/visitors` | No | List visitors |
| POST | `/visitors` | No | Register a visitor |
| GET | `/maintenance/stats` | Yes | Get maintenance stats |
| GET | `/maintenance/transactions` | Yes | Get recent transactions |

> Full interactive API docs available at **http://localhost:8000/docs** when the backend is running.

---

## Database Models

| Model | Table | Description |
|---|---|---|
| `User` | `users` | Registered residents — email + hashed password |
| `Facility` | `facilities` | Bookable amenities with session duration and daily limits |
| `FacilityBooking` | `facility_bookings` | Confirmed bookings linked to a user and facility |
| `Complaint` | `complaints` | Resident complaints with status tracking |
| `Visitor` | `visitors` | Expected and active visitor passes |
| `Transaction` | `transactions` | Maintenance dues and society transactions |

---

## How Slot Locking Works

To prevent two users from booking the same slot simultaneously, BookIt uses a Redis-based distributed lock:

1. User selects a slot → frontend calls `POST /facilities/{id}/slots/{slot}/lock`
2. Backend checks if the slot is already confirmed in PostgreSQL → rejects if so
3. Backend checks if another user holds a Redis lock on that slot → rejects if so
4. If free, backend writes `slot_lock:{facility_id}:{date}:{slot_time} = {user_id}` to Redis with a **15-minute TTL**
5. The slot appears as **"Held"** to all other users browsing the same date
6. When the user confirms → booking is saved to PostgreSQL → Redis lock is deleted
7. If the user navigates away or the TTL expires → lock is released automatically and the slot becomes available again
