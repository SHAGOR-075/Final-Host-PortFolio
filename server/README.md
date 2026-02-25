# Portfolio Dashboard Server

Backend server for Portfolio Dashboard using Express.js and MongoDB.

## Features

- RESTful API for Work, Blog, Skills, and CV management
- JWT-based authentication for admin
- File upload handling for CV
- MongoDB database integration
- CORS enabled for client and admin

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_dashboard
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Create initial admin (first time setup)
- `POST /api/auth/register` - Register new admin (for testing with Postman)

### Work
- `GET /api/work` - Get all work items
- `GET /api/work/:id` - Get single work item
- `POST /api/work` - Create work item (admin only)
- `PUT /api/work/:id` - Update work item (admin only)
- `DELETE /api/work/:id` - Delete work item (admin only)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create blog post (admin only)
- `PUT /api/blog/:id` - Update blog post (admin only)
- `DELETE /api/blog/:id` - Delete blog post (admin only)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills?type=design` - Get design skills
- `GET /api/skills?type=development` - Get development skills
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

### CV
- `GET /api/cv` - Get current CV
- `POST /api/cv/upload` - Upload CV (admin only, multipart/form-data)
- `DELETE /api/cv` - Delete CV (admin only)

### Contact
- `POST /api/contact` - Send contact form message (sends email to your Gmail)
- `GET /api/contact` - Get all contact messages

## Initial Setup

1. Start MongoDB
2. Start the server
3. Create an admin account using one of these methods:

**Method 1: Using setup endpoint**
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

**Method 2: Using register endpoint (recommended for testing)**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

**Using Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

## Authentication

Admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The token is obtained from the login endpoint and should be stored by the admin client.

## File Uploads

CV files are stored in the `uploads/` directory. Make sure this directory exists and has write permissions.

## Database Models

- **Work**: title, category, image, likes, link
- **Blog**: title, category, readTime, excerpt, date, image
- **Skill**: name, percentage, type (design/development)
- **CV**: filename, originalName, path, size, mimeType
- **Admin**: email, password (hashed)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `CLIENT_URL` - Frontend client URL for CORS
- `ADMIN_URL` - Admin panel URL for CORS
- `GMAIL_USER` - Your Gmail address for sending emails
- `GMAIL_APP_PASSWORD` - Gmail App Password (16 characters, no spaces)
- `RECIPIENT_EMAIL` - Email address where you want to receive contact form messages

**Note:** See `GMAIL_SETUP.md` for detailed Gmail configuration instructions.

