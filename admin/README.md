# Portfolio Admin Panel

Admin panel for managing portfolio content including work items, blog posts, skills, and CV uploads.

## Features

- **Admin Login**: Secure authentication system
- **Work Management**: Add, edit, and delete work/project items
- **Blog Management**: Add, edit, and delete blog posts
- **Skills Management**: Manage Design and Development skills with percentages
- **CV Upload**: Upload and manage CV/resume files

## Setup

1. Install dependencies:
```bash
cd admin
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the admin panel at `http://localhost:5174`

## Default Login Credentials

- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## Project Structure

```
admin/
├── src/
│   ├── pages/
│   │   ├── Login.tsx              # Admin login page
│   │   ├── Dashboard.tsx          # Main dashboard layout
│   │   ├── DashboardHome.tsx      # Dashboard home page
│   │   ├── WorkManagement.tsx     # Work items CRUD
│   │   ├── BlogManagement.tsx     # Blog posts CRUD
│   │   ├── SkillsManagement.tsx   # Skills management
│   │   └── CVUpload.tsx           # CV upload functionality
│   ├── App.tsx                    # Main app router
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── package.json
└── vite.config.ts
```

## Usage

### Work Management
- Click "Work Management" in the sidebar
- Add new work items with title, category, image, likes, and link
- Edit or delete existing work items

### Blog Management
- Click "Blog Management" in the sidebar
- Add new blog posts with title, category, read time, excerpt, date, and image
- Edit or delete existing blog posts

### Skills Management
- Click "Skills Management" in the sidebar
- Manage Design Skills and Development Skills separately
- Add, edit, or delete skills with name and percentage

### CV Upload
- Click "CV Upload" in the sidebar
- Upload PDF or Word documents
- Download or delete uploaded CVs

## Notes

- Currently uses localStorage for data persistence (for demo purposes)
- In production, integrate with Convex backend for proper data storage
- File uploads are stored locally; integrate with cloud storage for production
- Authentication is basic; implement proper auth system for production

## Future Enhancements

- Integrate with Convex backend
- Add image upload functionality
- Implement proper authentication
- Add data export/import features
- Add analytics and statistics

