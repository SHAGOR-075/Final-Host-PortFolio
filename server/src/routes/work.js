import express from 'express';
import Work from '../models/Work.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all work items
router.get('/', async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single work item
router.get('/:id', async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ error: 'Work not found' });
    }
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create work item (admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, category, image, likes, link, description, role, tools, features, liveDemoUrl, sourceCodeUrl } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    const parsedTools = Array.isArray(tools)
      ? tools
      : typeof tools === 'string'
        ? tools.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    const parsedFeatures = Array.isArray(features)
      ? features
      : typeof features === 'string'
        ? features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [];

    const work = new Work({
      title,
      category,
      image: image || 'gradient-1',
      likes: likes || 0,
      link: link || '#',
      description: description || '',
      role: role || '',
      tools: parsedTools,
      features: parsedFeatures,
      liveDemoUrl: liveDemoUrl || link || '',
      sourceCodeUrl: sourceCodeUrl || ''
    });

    await work.save();
    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update work item (admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, category, image, likes, link, description, role, tools, features, liveDemoUrl, sourceCodeUrl } = req.body;

    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ error: 'Work not found' });
    }

    if (title) work.title = title;
    if (category) work.category = category;
    if (image) work.image = image;
    if (likes !== undefined) work.likes = likes;
    if (link) work.link = link;
    if (description !== undefined) work.description = description;
    if (role !== undefined) work.role = role;

    if (tools !== undefined) {
      work.tools = Array.isArray(tools)
        ? tools
        : typeof tools === 'string'
          ? tools.split(',').map((t) => t.trim()).filter(Boolean)
          : [];
    }

    if (features !== undefined) {
      work.features = Array.isArray(features)
        ? features
        : typeof features === 'string'
          ? features.split('\n').map((f) => f.trim()).filter(Boolean)
          : [];
    }

    if (liveDemoUrl !== undefined) {
      work.liveDemoUrl = liveDemoUrl;
    }
    if (sourceCodeUrl !== undefined) {
      work.sourceCodeUrl = sourceCodeUrl;
    }

    await work.save();
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete work item (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) {
      return res.status(404).json({ error: 'Work not found' });
    }
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

