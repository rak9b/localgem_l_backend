# LocalGems Backend API

> **RESTful API for Tour Booking Platform** - Built with Node.js, Express, TypeScript, Prisma, and PostgreSQL

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
docker-compose up -d  # OR start PostgreSQL locally

# Run database migrations
npx prisma db push

# Seed database with demo data
npm run seed

# Start development server
npm run dev
```

Server running at: **http://localhost:5000**

---

## 📍 Complete API Reference

### Base URL
```
http://localhost:5000/api/v1
```

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/auth/register` | Create new user account | ❌ |
| **POST** | `/auth/login` | Login user | ❌ |
| **POST** | `/auth/refresh-token` | Refresh JWT token | ❌ |
| **GET** | `/auth/me` | Get current user | ✅ |

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "role": "TOURIST"  // TOURIST | GUIDE | ADMIN
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

---

### 🗺️ Tour Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **GET** | `/tours` | Get all tours (with filters) | ❌ |
| **GET** | `/tours/:id` | Get single tour by ID | ❌ |
| **POST** | `/tours` | Create new tour | ✅ Guide/Admin |
| **PATCH** | `/tours/:id` | Update tour | ✅ Guide/Admin |
| **DELETE** | `/tours/:id` | Delete tour | ✅ Admin |

#### Get All Tours (with filtering)
```http
GET /api/v1/tours?page=1&limit=10&search=rome&category=Food&minPrice=0&maxPrice=100&city=Rome&sortBy=rating&sortOrder=desc
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search in title/description
- `category` (string): Filter by category
- `city` (string): Filter by city
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `sortBy` (string): Sort field (rating, price, createdAt)
- `sortOrder` (string): asc | desc

#### Get Single Tour
```http
GET /api/v1/tours/clxxx123456789
```

#### Create Tour  
```http
POST /api/v1/tours
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Hidden Gems of Tokyo",
  "description": "Explore secret spots...",
  "city": "Tokyo",
  "country": "Japan",
  "category": "Culture",
  "price": 75,
  "duration": "3 hours",
  "maxGroupSize": 8,
  "meetingPoint": "Shibuya Station",
  "images": ["https://..."],
  "itinerary": "Meet at station...",
  "languages": ["English", "Japanese"]
}
```

---

### 💼 Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/bookings` | Create new booking | ✅ Tourist |
| **GET** | `/bookings/my-bookings` | Get user's bookings | ✅ |
| **GET** | `/bookings` | Get all bookings | ✅ Admin |
| **GET** | `/bookings/:id` | Get single booking | ✅ |
| **PATCH** | `/bookings/:id` | Update booking status | ✅ Admin/Guide |

#### Create Booking
```http
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "tourId": "clxxx123456789",
  "tourDate": "2024-12-25",
  "guests": 2,
  "specialRequirements": "Vegetarian meals",
  "contactPhone": "+1234567890"
}
```

#### Get My Bookings
```http
GET /api/v1/bookings/my-bookings
Authorization: Bearer <token>
```

---

### ⭐ Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/reviews` | Create review | ✅ Tourist |
| **GET** | `/reviews/tour/:tourId` | Get tour reviews | ❌ |
| **PATCH** | `/reviews/:id` | Update review | ✅ Owner |
| **DELETE** | `/reviews/:id` | Delete review | ✅ Owner/Admin |

#### Create Review
```http
POST /api/v1/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "tourId": "clxxx123456789",
  "rating": 5,
  "comment": "Amazing experience!",
  "images": ["https://..."]
}
```

---

### 👤 User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **GET** | `/users/profile` | Get own profile | ✅ |
| **PATCH** | `/users/profile` | Update profile | ✅ |
| **GET** | `/users` | Get all users | ✅ Admin |
| **GET** | `/users/:id` | Get user by ID | ✅ Admin |

#### Update Profile
```http
PATCH /api/v1/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Updated",
  "bio": "Travel enthusiast...",
  "location": "Paris, France",
  "avatar": "https://...",
  "languages": ["English", "French"]
}
```

---

### 💳 Payment Endpoints (Stripe)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/payments/create-intent` | Create payment intent | ✅ |
| **POST** | `/webhooks/stripe` | Stripe webhook handler | ❌ |

---

### 📊 Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **GET** | `/admin/stats` | Platform statistics | ✅ Admin |
| **GET** | `/admin/users` | Manage users | ✅ Admin |
| **PATCH** | `/admin/users/:id/verify` | Verify guide | ✅ Admin |

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL 15 |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Payments | Stripe |
| Validation | Zod (optional) |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── auth/           # Authentication
│   │   │   ├── tour/           # Tour management
│   │   │   ├── booking/        # Bookings
│   │   │   ├── review/         # Reviews
│   │   │   └── user/           # User profiles
│   │   ├── middlewares/
│   │   │   ├── auth.ts         # JWT verification
│   │   │   ├── errorHandler.ts
│   │   │   └── notFound.ts
│   │   └── routes/
│   │       └── index.ts        # Route aggregator
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Seed data
│   ├── app.ts                  # Express app
│   └── server.ts               # Server entry
├── .env                        # Environment variables
├── .env.example
├── ENVIRONMENT.md              # Env setup guide
└── package.json
```

---

## 🗄️ Database Schema

### Models
- **User** (id, email, password, name, role, avatar, bio, location)
- **Tour** (id, title, description, city, country, price, duration, guideId...)
- **Booking** (id, userId, tourId, tourDate, guests, status, totalAmount...)
- **Review** (id, userId, tourId, rating, comment, images...)

### Relationships
```
User (1) --> (many) Tours (as guide)
User (1) --> (many) Bookings
User (1) --> (many) Reviews
Tour (1) --> (many) Bookings
Tour (1) --> (many) Reviews
```

---

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/localgems

# Auth
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Email, Cloud Storage, etc.
# See ENVIRONMENT.md for full reference
```

See **ENVIRONMENT.md** for comprehensive configuration guide.

---

## 🗃️ Database Setup

### Using Docker (Recommended)
```bash
# Start PostgreSQL container
docker-compose up -d

# Check if running
docker ps

# Access database
docker exec -it localgems-db psql -U postgres -d localgems
```

### Local PostgreSQL
```bash
# Create database
createdb localgems

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://youruser:yourpass@localhost:5432/localgems
```

### Migrations
```bash
# Sync schema with database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (Database GUI)
npx prisma studio
```

### Seed Database
```bash
# Populate with demo data (100+ tours, users, bookings, reviews)
npm run seed
```

---

## 🧪 Testing

### Manual API Testing

#### Using cURL
```bash
# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User","role":"TOURIST"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get tours
curl http://localhost:5000/api/v1/tours
```

#### Using Postman/Insomnia
Import the API collection (if available) or use the endpoints above.

---

## 🚀 Deployment

### Prepare for Production
```bash
# Build TypeScript
npm run build

# Output in dist/ folder
```

### Railway (Recommended)
1. Connect GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically

### Heroku
```bash
heroku create localgems-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Docker
```bash
# Build image
docker build -t localgems-api .

# Run container
docker run -p 5000:5000 --env-file .env localgems-api
```

---

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (ts-node-dev) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with demo data |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma db push` | Sync schema to database |

---

## 🐛 Troubleshooting

### "Can't reach database server"
✅ **Solution**:
```bash
# Check if PostgreSQL is running
docker ps
# OR
pg_isready

# Start database
docker start localgems-db
# OR restart
docker-compose restart
```

### "Invalid JWT token"
✅ **Solution**: Check `JWT_SECRET` in `.env` matches between requests.

### "Prisma Client not initialized"
✅ **Solution**:
```bash
npx prisma generate
npm run build
```

### "Port 5000 already in use"
✅ **Solution**: Change `PORT` in `.env` or kill process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

---

## 🔒 Security Best Practices

### Production Checklist
- [ ] Change `JWT_SECRET` to strong random value
- [ ] Use strong database password
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up error monitoring (Sentry)
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable Helmet.js middleware
- [ ] Validate all inputs
- [ ] Sanitize user data

---

## 📖 API Documentation

### Swagger/OpenAPI
*(Optional)* Access interactive API docs at:
```
http://localhost:5000/api-docs
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

---

## 📞 Support

- **Environment Setup**: See `ENVIRONMENT.md`
- **Database Issues**: See troubleshooting section
- **API Questions**: Refer to endpoint documentationabove

---

**Built with ❤️ for LocalGems Platform**
#   l o c a l g e m _ l _ b a c k e n d  
 