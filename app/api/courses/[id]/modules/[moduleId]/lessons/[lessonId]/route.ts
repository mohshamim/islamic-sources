import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
    lessonId: string;
  }>;
}

// GET - Get single lesson
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { lessonId } = await params;
    const supabase = createAdminSupabaseClient();

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*),
        lesson_exercises (*)
      `)
      .eq('id', lessonId)
      .single();

    if (error) {
      console.error('Error fetching lesson:', error);
      return NextResponse.json(
        { error: 'Lesson not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error: any) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update lesson
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { lessonId } = await params;
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const {
      title,
      description,
      type,
      content_url,
      duration_minutes,
      is_preview,
      order_index,
      study_materials,
      practice_materials,
      learning_objectives
    } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (content_url !== undefined) updateData.content_url = content_url;
    if (duration_minutes !== undefined) updateData.duration_minutes = duration_minutes;
    if (is_preview !== undefined) updateData.is_preview = is_preview;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (study_materials !== undefined) updateData.study_materials = study_materials;
    if (practice_materials !== undefined) updateData.practice_materials = practice_materials;
    if (learning_objectives !== undefined) updateData.learning_objectives = learning_objectives;

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .update(updateData)
      .eq('id', lessonId)
      .select()
      .single();

    if (error) {
      console.error('Error updating lesson:', error);
      return NextResponse.json(
        { error: 'Failed to update lesson', details: error.message },
        { status: 500 }
      );
    }

    // Update course duration
    const { data: moduleData } = await supabase
      .from('course_modules')
      .select('course_id')
      .eq('id', lesson.module_id)
      .single();

    if (moduleData) {
      const { data: allLessons } = await supabase
        .from('course_lessons')
        .select('duration_minutes, module_id')
        .in('module_id', [
          ...(await supabase
            .from('course_modules')
            .select('id')
            .eq('course_id', moduleData.course_id)
            .then(res => res.data?.map(m => m.id) || []))
        ]);

      if (allLessons) {
        const totalDuration = allLessons.reduce((sum, l) => sum + (l.duration_minutes || 0), 0);
        await supabase
          .from('courses')
          .update({ duration_minutes: totalDuration })
          .eq('id', moduleData.course_id);
      }
    }

    return NextResponse.json(lesson);
  } catch (error: any) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete lesson
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { lessonId } = await params;
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase
      .from('course_lessons')
      .delete()
      .eq('id', lessonId);

    if (error) {
      console.error('Error deleting lesson:', error);
      return NextResponse.json(
        { error: 'Failed to delete lesson', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Lesson deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json(
      { error: 'Failed to delete lesson', details: error.message },
      { status: 500 }
    );
  }
}
