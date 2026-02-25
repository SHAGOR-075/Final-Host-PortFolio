import express from 'express';
import Skill from '../models/Skill.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const skills = await Skill.find(query).sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create skill (admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, percentage, type, icon } = req.body;

    if (!name || percentage === undefined || !type) {
      return res.status(400).json({ error: 'Name, percentage, and type are required' });
    }

    const allowedTypes = ['design', 'development', 'tools'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Type must be one of "design", "development", or "tools"' });
    }

    const skill = new Skill({
      name,
      percentage: Math.max(0, Math.min(100, percentage)),
      type,
      icon: icon || ''
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update skill (admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, percentage, type, icon } = req.body;

    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    if (name) skill.name = name;
    if (percentage !== undefined) {
      skill.percentage = Math.max(0, Math.min(100, percentage));
    }
    if (icon !== undefined) {
      skill.icon = icon;
    }

    const allowedTypes = ['design', 'development', 'tools'];
    if (type && allowedTypes.includes(type)) {
      skill.type = type;
    }

    await skill.save();
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete skill (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

