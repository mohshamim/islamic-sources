import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
    lessonId: string;
  }>;
}

// GET - List all resources for a lesson
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { lessonId } = await params;
    const supabase = createAdminSupabaseClient();

    const { data: resources, error } = await supabase
      .from('lesson_resources')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching resources:', error);
      return NextResponse.json(
        { error: 'Failed to fetch resources', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ resources: resources || [] });
  } catch (error: any) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new resource
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { lessonId } = await params;
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const { title, description, type, url, is_downloadable, order_index } = body;

    if (!title || !type || !url) {
      return NextResponse.json(
        { error: 'Title, type, and URL are required' },
        { status: 400 }
      );
    }

    // Get the next order index if not provided
    let finalOrderIndex = order_index;
    if (finalOrderIndex === undefined) {
      const { data: existingResources } = await supabase
        .from('lesson_resources')
        .select('order_index')
        .eq('lesson_id', lessonId)
        .order('order_index', { ascending: false })
        .limit(1);

      finalOrderIndex = existingResources && existingResources.length > 0 
        ? existingResources[0].order_index + 1 
        : 1;
    }

    const { data: resource, error } = await supabase
      .from('lesson_resources')
      .insert({
        lesson_id: lessonId,
        title,
        description: description || null,
        type,
        url,
        is_downloadable: is_downloadable !== undefined ? is_downloadable : true,
        order_index: finalOrderIndex,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resource:', error);
      return NextResponse.json(
        { error: 'Failed to create resource', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(resource, { status: 201 });
  } catch (error: any) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update resource
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createAdminSupabaseClient();
    const body = await request.json();
    const { id, title, description, type, url, is_downloadable, order_index } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (url !== undefined) updateData.url = url;
    if (is_downloadable !== undefined) updateData.is_downloadable = is_downloadable;
    if (order_index !== undefined) updateData.order_index = order_index;

    const { data: resource, error } = await supabase
      .from('lesson_resources')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating resource:', error);
      return NextResponse.json(
        { error: 'Failed to update resource', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(resource);
  } catch (error: any) {
    console.error('Error updating resource:', error);
    return NextResponse.json(
      { error: 'Failed to update resource', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete resource
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createAdminSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const resourceId = searchParams.get('id');

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('lesson_resources')
      .delete()
      .eq('id', resourceId);

    if (error) {
      console.error('Error deleting resource:', error);
      return NextResponse.json(
        { error: 'Failed to delete resource', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Resource deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting resource:', error);
    return NextResponse.json(
      { error: 'Failed to delete resource', details: error.message },
      { status: 500 }
    );
  }
}
