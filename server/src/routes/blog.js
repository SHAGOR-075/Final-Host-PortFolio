import express from 'express';
import Blog from '../models/Blog.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create blog post (admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, category, readTime, excerpt, date, image, content } = req.body;

    if (!title || !category || !excerpt) {
      return res.status(400).json({ error: 'Title, category, and excerpt are required' });
    }

    const blog = new Blog({
      title,
      category,
      readTime: readTime || '5 min read',
      excerpt,
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: image || 'gradient-1',
      content: content || ''
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, category, readTime, excerpt, date, image, content } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (title) blog.title = title;
    if (category) blog.category = category;
    if (readTime) blog.readTime = readTime;
    if (excerpt) blog.excerpt = excerpt;
    if (date) blog.date = date;
    if (image) blog.image = image;
    if (content !== undefined) blog.content = content;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

