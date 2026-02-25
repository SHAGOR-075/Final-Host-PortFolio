import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  readTime: {
    type: String,
    required: true,
    default: '5 min read'
  },
  excerpt: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default: 'gradient-1'
  },
  content: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);

