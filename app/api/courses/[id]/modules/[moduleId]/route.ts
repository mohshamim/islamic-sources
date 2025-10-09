import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

// GET - Get single module
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { moduleId } = await params;
    const supabase = createAdminSupabaseClient();

    const { data: module, error } = await supabase
      .from('course_modules')
      .select(`
        *,
        course_lessons (
          *,
          lesson_resources (*),
          lesson_exercises (*)
        )
      `)
      .eq('id', moduleId)
      .single();

    if (error) {
      console.error('Error fetching module:', error);
      return NextResponse.json(
        { error: 'Module not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(module);
  } catch (error: any) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { error: 'Failed to fetch module', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update module
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { moduleId } = await params;
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const { title, description, order_index } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (order_index !== undefined) updateData.order_index = order_index;

    const { data: module, error } = await supabase
      .from('course_modules')
      .update(updateData)
      .eq('id', moduleId)
      .select()
      .single();

    if (error) {
      console.error('Error updating module:', error);
      return NextResponse.json(
        { error: 'Failed to update module', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(module);
  } catch (error: any) {
    console.error('Error updating module:', error);
    return NextResponse.json(
      { error: 'Failed to update module', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete module
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { moduleId } = await params;
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase
      .from('course_modules')
      .delete()
      .eq('id', moduleId);

    if (error) {
      console.error('Error deleting module:', error);
      return NextResponse.json(
        { error: 'Failed to delete module', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Module deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting module:', error);
    return NextResponse.json(
      { error: 'Failed to delete module', details: error.message },
      { status: 500 }
    );
  }
}
