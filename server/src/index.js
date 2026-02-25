import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import workRoutes from './routes/work.js';
import blogRoutes from './routes/blog.js';
import skillsRoutes from './routes/skills.js';
import cvRoutes from './routes/cv.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import chatbotRoutes from './routes/chatbot.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL || 'https://shagor-port-folio.vercel.app', process.env.ADMIN_URL || 'https://portfolio-admin-orpin.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/work', workRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Root and health check routes (useful for Railway/Vercel "Cannot GET /")
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio API is running. Try /api/health or other /api/* endpoints.',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://FinalPortfolio:FinalPortfolio2025@portfolio.gv9on3q.mongodb.net/?appName=Portfolio')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

export default app;

