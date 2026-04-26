# BookIt — Database (PostgreSQL 15)

Standalone PostgreSQL service. Data is persisted in a named Docker volume so it survives container restarts.

## Run standalone

```bash
cp .env.example .env
# Edit .env with your credentials
docker-compose up -d
```

PostgreSQL available at → `localhost:5432`

## Run as part of the full stack

Use the root `docker-compose.yml` from the `BookIt/` directory:

```bash
cd ..
docker-compose up --build
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `POSTGRES_USER` | Database username | `myuser` |
| `POSTGRES_PASSWORD` | Database password | `mypassword` |
| `POSTGRES_DB` | Database name | `bookit_db` |
| `POSTGRES_PORT` | Host port to expose | `5432` |

## Connecting the backend

After deploying, set `DATABASE_URL` in `backend/.env`:

```
DATABASE_URL=postgresql://myuser:mypassword@<this-host>:5432/bookit_db
```
