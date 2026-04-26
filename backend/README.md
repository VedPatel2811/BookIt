# BookIt — Backend (FastAPI)

REST API built with FastAPI, SQLAlchemy, and Redis.

## Run standalone

```bash
cp .env.example .env
# Set DATABASE_URL and REDIS_URL to point to your running PostgreSQL and Redis instances
docker-compose up --build
```

API available at → http://localhost:8000  
Swagger docs → http://localhost:8000/docs

## Run as part of the full stack

Use the root `docker-compose.yml` from the `BookIt/` directory instead:

```bash
cd ..
docker-compose up --build
```

## Environment Variables

See `.env.example` for all variables with descriptions.

Key variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `SECRET_KEY` | JWT signing key — generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |

## Notes

- Database tables are created automatically on startup via `Base.metadata.create_all`
- Facility seed data is inserted on first request to `GET /facilities` if the table is empty
- Redis is optional — if unavailable, slot locking is skipped gracefully and bookings still work
