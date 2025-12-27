# Database Setup Guide

## Quick Start (PostgreSQL)

### Option 1: Install PostgreSQL Locally

1. **Download PostgreSQL**: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. **Install** with default settings (port 5432, user: postgres, password: postgres)
3. **Create Database**:
   ```bash
   # Open Command Prompt
   psql -U postgres
   CREATE DATABASE localgems;
   \q
   ```

### Option 2: Use Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name localgems-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=localgems -p 5432:5432 -d postgres:15

# Verify it's running
docker ps
```

## Setup Steps

1. **Ensure PostgreSQL is running** (check Task Manager or Docker Desktop)

2. **Update `.env` file** (already configured):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/localgems?schema=public"
   ```

3. **Run Prisma migrations**:
   ```bash
   npm run prisma:migrate
   ```

4. **Seed the database** with demo data:
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

## Demo Credentials

After seeding, you can log in with:

- **Tourist Account**
  - Email: `sarah@tourist.com`
  - Password: `tourist123`
  - Role: Regular user/tourist

- **Guide Account**
  - Email: `elena@guide.com`
  - Password: `guide456`
  - Role: Tour guide (can create tours)

- **Admin Account**
  - Email: `admin@localgems.com`
  - Password: `admin789`
  - Role: Administrator (full access)

## Troubleshooting

### Error: "Can't reach database server at `localhost:5432`"

**Solutions:**
1. Check if PostgreSQL service is running:
   - Windows: Services → PostgreSQL → Start
   - Docker: `docker start localgems-db`

2. Verify port 5432 is not in use:
   ```bash
   netstat -ano | findstr :5432
   ```

3. Check credentials in `.env` match your PostgreSQL setup

### Error: "Database does not exist"

```bash
# Recreate database
psql -U postgres
DROP DATABASE IF EXISTS localgems;
CREATE DATABASE localgems;
\q

# Then run migrations again
npm run prisma:migrate
```

### Reset Database

```bash
# Drop all tables and re-seed
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Run all migrations
# 4. Run the seed script
```

## Verifying Setup

After setup, you should see:
```
✅ Created demo users:
   Tourist: sarah@tourist.com / tourist123
   Guide: elena@guide.com / guide456
   Admin: admin@localgems.com / admin789
✅ Created sample tours
✅ Created sample booking
✅ Created sample review
🎉 Database seeded successfully!
```

## Database Schema

The database includes:
- **Users** (3 demo accounts with different roles)
- **Tours** (2 sample tours in Rome)
- **Bookings** (1 confirmed booking)
- **Reviews** (1 sample review)
