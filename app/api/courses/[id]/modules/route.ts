import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - List all modules for a course
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabaseClient();

    const { data: modules, error } = await supabase
      .from('course_modules')
      .select(`
        *,
        course_lessons (
          id,
          title,
          description,
          type,
          duration_minutes,
          order_index
        )
      `)
      .eq('course_id', id)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching modules:', error);
      return NextResponse.json(
        { error: 'Failed to fetch modules', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ modules: modules || [] });
  } catch (error: any) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new module
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const { title, description, order_index } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Get the next order index if not provided
    let finalOrderIndex = order_index;
    if (finalOrderIndex === undefined) {
      const { data: existingModules } = await supabase
        .from('course_modules')
        .select('order_index')
        .eq('course_id', id)
        .order('order_index', { ascending: false })
        .limit(1);

      finalOrderIndex = existingModules && existingModules.length > 0 
        ? existingModules[0].order_index + 1 
        : 1;
    }

    const { data: module, error } = await supabase
      .from('course_modules')
      .insert({
        course_id: id,
        title,
        description: description || null,
        order_index: finalOrderIndex,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating module:', error);
      return NextResponse.json(
        { error: 'Failed to create module', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(module, { status: 201 });
  } catch (error: any) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Failed to create module', details: error.message },
      { status: 500 }
    );
  }
}