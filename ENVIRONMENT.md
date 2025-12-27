# Environment Configuration Guide

## Quick Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update required variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Generate a strong secret key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (if using payments)

## Variable Reference

### Core Settings

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | `development` | Application environment |
| `PORT` | Yes | `5000` | Server port |
| `FRONTEND_URL` | Yes | `http://localhost:3000` | Frontend application URL |

### Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | PostgreSQL connection string |
| `DATABASE_POOL_MIN` | No | Minimum connection pool size (default: 2) |
| `DATABASE_POOL_MAX` | No | Maximum connection pool size (default: 10) |

### Security

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | **Yes** | Secret key for signing JWTs (CHANGE IN PRODUCTION!) |
| `JWT_EXPIRES_IN` | No | JWT expiration time (default: 7d) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token expiration (default: 30d) |
| `BCRYPT_SALT_ROUNDS` | No | Password hashing strength (default: 12) |

### Payment (Stripe)

| Variable | Required | Description |
|----------|----------|-------------|
| `STRIPE_SECRET_KEY` | **Yes** | Stripe secret API key |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key (for frontend) |
| `STRIPE_WEBHOOK_SECRET` | **Yes** | Stripe webhook signing secret |

Get your keys from: https://dashboard.stripe.com/apikeys

### Email (Optional)

Configure SMTP to send transactional emails (booking confirmations, password reset, etc.)

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP server port (usually 587 for TLS) |
| `SMTP_SECURE` | Use SSL/TLS (true/false) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASSWORD` | SMTP password or app-specific password |
| `EMAIL_FROM` | Default "From" email address |

#### Gmail Setup Example:
1. Enable 2-Factor Authentication
2. Generate App-Specific Password
3. Use `smtp.gmail.com` on port `587`

### Cloud Storage (Optional)

For user uploads (tour images, profile pictures, etc.)

#### AWS S3:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=localgems-uploads
```

#### Cloudinary (Alternative):
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Security Best Practices

### Development
✅ Use `.env` for local development
✅ Never commit `.env` to version control
✅ Use weak passwords for local testing

### Production
⚠️ **CRITICAL**: Change all default secrets!
⚠️ Use strong, randomly generated `JWT_SECRET`
⚠️ Enable HTTPS only (`NODE_ENV=production`)
⚠️ Use environment variables from hosting platform
⚠️ Restrict `CORS_ORIGINS` to your domain

### Generating Secrets

```bash
# Generate a strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Environment-Specific Configs

### Development
```env
NODE_ENV=development
LOG_LEVEL=debug
ENABLE_SWAGGER=true
ENABLE_DEBUG_LOGS=true
```

### Production
```env
NODE_ENV=production
LOG_LEVEL=error
ENABLE_SWAGGER=false
ENABLE_DEBUG_LOGS=false
SENTRY_DSN=https://your-sentry-dsn
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `docker ps` or `pg_isready`
- Check credentials in `DATABASE_URL`
- Ensure database `localgems` exists
- Try: `npx prisma db push` to sync schema

### Stripe Webhook Issues
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:5000/api/v1/webhooks/stripe`
- Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Email Not Sending
- Check SMTP credentials
- For Gmail: Use App-Specific Password, not account password
- Verify `SMTP_PORT` (587 for TLS, 465 for SSL)

## Testing

```bash
# Load environment and test
npm run dev

# Check if variables loaded correctly
node -e "require('dotenv').config(); console.log(process.env.PORT)"
```
