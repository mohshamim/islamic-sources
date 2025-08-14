import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this post.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this post.'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this post.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this post.'],
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

// Create slug from title before saving
PostSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  next();
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 