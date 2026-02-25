# Portfolio Dashboard - Full Stack Application

A complete portfolio dashboard application with a client-facing website, admin panel, and backend server.

## Project Structure

```
portfolio_dashboard_ui/
├── client/          # Frontend client application
├── admin/           # Admin panel application
└── server/         # Backend server (Express + MongoDB)
```

## Features

### Client (Portfolio Website)
- Dynamic work/projects showcase
- Blog posts display
- Skills display (Design & Development)
- Responsive design
- Modern UI with dark theme

### Admin Panel
- Admin authentication
- Work management (CRUD)
- Blog management (CRUD)
- Skills management (CRUD)
- CV upload functionality

### Server
- RESTful API
- MongoDB database
- JWT authentication
- File upload handling
- CORS configuration

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Server Setup

```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_dashboard
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Start MongoDB and then start the server:
```bash
npm run dev
```

### 2. Create Initial Admin Account

After starting the server, create an admin account:
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

### 3. Client Setup

```bash
cd client
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

### 4. Admin Setup

```bash
cd admin
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the admin panel:
```bash
npm run dev
```

## Running the Full Stack

1. **Start MongoDB** (if using local instance)
2. **Start Server**: `cd server && npm run dev` (runs on port 5000)
3. **Start Client**: `cd client && npm run dev` (runs on port 5173)
4. **Start Admin**: `cd admin && npm run dev` (runs on port 5174)

## Default Admin Credentials

- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## API Endpoints

### Public Endpoints
- `GET /api/work` - Get all work items
- `GET /api/blog` - Get all blog posts
- `GET /api/skills` - Get all skills
- `GET /api/cv` - Get current CV

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/work` - Create work item
- `PUT /api/work/:id` - Update work item
- `DELETE /api/work/:id` - Delete work item
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/cv/upload` - Upload CV
- `DELETE /api/cv` - Delete CV

## Database Models

- **Work**: Projects/work items
- **Blog**: Blog posts
- **Skill**: Design and development skills
- **CV**: Uploaded CV/resume files
- **Admin**: Admin user accounts

## Technology Stack

### Client & Admin
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Server
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Uploads)

## Development

### Adding New Features

1. **Backend**: Add routes in `server/src/routes/`
2. **Models**: Add schemas in `server/src/models/`
3. **Client**: Update components in `client/src/components/`
4. **Admin**: Update pages in `admin/src/pages/`

### Environment Variables

Make sure to set up `.env` files in each directory:
- `server/.env` - Server configuration
- `client/.env` - Client API URL
- `admin/.env` - Admin API URL

## Production Deployment

1. Set `NODE_ENV=production` in server `.env`
2. Use a secure `JWT_SECRET`
3. Use MongoDB Atlas or production MongoDB instance
4. Update CORS URLs to production domains
5. Build client and admin: `npm run build`
6. Serve static files or deploy to hosting services

## License

MIT

