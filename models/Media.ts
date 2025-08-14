import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this media.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the media type.'],
    enum: ['pdf', 'audio', 'video', 'image'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this media.'],
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
  fileUrl: {
    type: String,
    required: [true, 'Please provide a file URL.'],
  },
  fileName: {
    type: String,
    required: [true, 'Please provide a file name.'],
  },
  fileSize: {
    type: Number, // in bytes
  },
  // Audio specific fields
  speaker: {
    type: String,
  },
  duration: {
    type: Number, // in seconds
  },
  // Video specific fields
  thumbnail: {
    type: String,
  },
  // Image specific fields
  dimensions: {
    width: Number,
    height: Number,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  plays: {
    type: Number,
    default: 0,
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
MediaSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  next();
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema); 