import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  type: {
    type: String,
    required: true,
    enum: ['design', 'development', 'tools']
  },
  icon: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Skill', skillSchema);

