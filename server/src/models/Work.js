import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
    default: 'gradient-1'
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  link: {
    type: String,
    default: '#'
  },
  description: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  tools: {
    type: [String],
    default: []
  },
  features: {
    type: [String],
    default: []
  },
  liveDemoUrl: {
    type: String,
    default: ''
  },
  sourceCodeUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Work', workSchema);

