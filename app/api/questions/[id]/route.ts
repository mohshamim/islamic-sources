import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

// GET single question
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();
    const { id } = await params;
    
    const { data: question, error } = await supabase
      .from('questions')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        ),
        scholars (
          id,
          name,
          title
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      return NextResponse.json(
        { error: 'Question not found', details: error.message },
        { status: 404 }
      );
    }
    
    return NextResponse.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

// PUT update question
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminSupabaseClient();
    const { id } = await params;
    const body = await request.json();
    const { question, answer, category, tags, status, scholar } = body;
    
    if (!question && !answer && !category && !status) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    const updateData: any = {};
    
    if (question) {
      updateData.question = question;
      // Generate new slug if question changed
      updateData.slug = question
        .toLowerCase()
        .substring(0, 100)
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
    
    if (answer) {
      updateData.answer = answer;
    }
    
    if (tags) {
      updateData.tags = tags;
    }
    
    if (status) {
      updateData.status = status;
      if (status === 'published') {
        updateData.published_at = new Date().toISOString();
      }
    }
    
    // Get category ID if category provided
    if (category) {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();
      
      if (categoryData) {
        updateData.category_id = categoryData.id;
      }
    }
    
    const { data: updatedQuestion, error } = await supabase
      .from('questions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update question', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE question
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminSupabaseClient();
    const { id } = await params;
    
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete question', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
