import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminSupabaseClient();
    
    // Test basic connection
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name')
      .limit(5);
    
    if (categoriesError) {
      console.error('Categories error:', categoriesError);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: categoriesError.message,
        code: categoriesError.code
      }, { status: 500 });
    }
    
    // Test courses table
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, title')
      .limit(1);
    
    if (coursesError) {
      console.error('Courses table error:', coursesError);
      return NextResponse.json({
        success: false,
        error: 'Courses table issue',
        details: coursesError.message,
        code: coursesError.code
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        categories: categories?.length || 0,
        courses: courses?.length || 0,
        availableCategories: categories
      }
    });
    
  } catch (error: any) {
    console.error('Test DB error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error.message
    }, { status: 500 });
  }
}
