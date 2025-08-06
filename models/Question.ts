import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question.'],
    maxlength: [500, 'Question cannot be more than 500 characters'],
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this question.'],
    enum: ['Fiqh', 'Aqeedah', 'Hadith', 'Tafsir', 'Seerah', 'General'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  scholar: {
    type: String,
    default: 'Anonymous Scholar',
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

// Create slug from question before saving
QuestionSchema.pre('save', function(next) {
  // Generate slug if it doesn't exist or if question is modified
  if (!this.slug || this.isModified('question')) {
    this.slug = this.question
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50)
      .trim('-');
  }
  
  next();
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema); 