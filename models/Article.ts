import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this article.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this article.'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this article.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this article.'],
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
  author: {
    type: String,
    default: 'Admin',
  },
  readTime: {
    type: Number,
    default: 5, // minutes
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

// Create slug from title before saving
ArticleSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
  
  next();
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema); 