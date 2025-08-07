import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/models/Media';

interface UpdateData {
  title?: string;
  description?: string;
  type?: string;
  category?: string;
  tags?: string[];
  status?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  speaker?: string;
  duration?: number;
  thumbnail?: string;
  dimensions?: {
    width?: number;
    height?: number;
  };
}

// GET single media by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const media = await Media.findById(id).lean();
    
    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }
    
    // Increment views
    await Media.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// PUT update media
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    const { 
      title, 
      description, 
      type, 
      category, 
      tags, 
      status, 
      fileUrl, 
      fileName, 
      fileSize,
      speaker,
      duration,
      thumbnail,
      dimensions
    } = body;
    
    const updateData: UpdateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (type) updateData.type = type;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (status) updateData.status = status;
    if (fileUrl) updateData.fileUrl = fileUrl;
    if (fileName) updateData.fileName = fileName;
    if (fileSize) updateData.fileSize = fileSize;
    if (speaker) updateData.speaker = speaker;
    if (duration) updateData.duration = duration;
    if (thumbnail) updateData.thumbnail = thumbnail;
    if (dimensions) updateData.dimensions = dimensions;
    
    const media = await Media.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    );
  }
}

// DELETE media
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const media = await Media.findByIdAndDelete(id);
    
    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
} 