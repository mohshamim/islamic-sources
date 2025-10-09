import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Get all reviews for a course
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: courseId } = await params;
    const supabase = await createServerSupabaseClient();

    const { data: reviews, error } = await supabase
      .from('course_reviews')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: reviews || [] });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new review
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: courseId } = await params;
    const supabase = createAdminSupabaseClient();

    const body = await request.json();
    const { userEmail, userName, rating, comment } = body;

    if (!userEmail || !userName || !rating) {
      return NextResponse.json(
        { error: 'Email, name, and rating are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this course
    const { data: existingReview } = await supabase
      .from('course_reviews')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_email', userEmail)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this course' },
        { status: 400 }
      );
    }

    // Create review
    const { data: review, error } = await supabase
      .from('course_reviews')
      .insert({
        course_id: courseId,
        user_email: userEmail,
        user_name: userName,
        rating,
        comment: comment || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return NextResponse.json(
        { error: 'Failed to create review', details: error.message },
        { status: 500 }
      );
    }

    // Note: Course rating and review_count are auto-updated by trigger

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review', details: error.message },
      { status: 500 }
    );
  }
}

