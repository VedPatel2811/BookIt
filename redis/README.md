# BookIt — Redis 7

Standalone Redis service used for:
- **Slot locking** — temporarily holds a slot for a user while they fill in booking details (15-min TTL)
- **Token blacklisting** — invalidates JWT tokens on logout

Data is persisted with AOF (append-only file) in a named Docker volume.

## Run standalone

```bash
cp .env.example .env
docker-compose up -d
```

Redis available at → `localhost:6379`

## Run as part of the full stack

Use the root `docker-compose.yml` from the `BookIt/` directory:

```bash
cd ..
docker-compose up --build
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `REDIS_PORT` | Host port to expose | `6379` |

## Connecting the backend

After deploying, set `REDIS_URL` in `backend/.env`:

```
# No password
REDIS_URL=redis://<this-host>:6379/0
```

## Notes

- Redis is optional for the backend — if it is unreachable, slot locking is skipped gracefully and the API continues to function. Bookings will still be saved to PostgreSQL.
- For production, consider adding a password by updating the `command` in `docker-compose.yml`:
  ```yaml
  command: ["redis-server", "--appendonly", "yes", "--requirepass", "your_strong_password"]
  ```
  And updating `REDIS_URL` accordingly:
  ```
  REDIS_URL=redis://:your_strong_password@<host>:6379/0
  ```
