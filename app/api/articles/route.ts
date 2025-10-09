import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

// GET all articles
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    let query = supabase
      .from('articles')
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
      `, { count: 'exact' });
    
    if (category) {
      query = query.eq('categories.slug', category);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch articles', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      articles: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST create new article
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminSupabaseClient();
    
    const body = await request.json();
    const { title, excerpt, content, category, tags, status, author, readTime } = body;
    
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Get category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', category)
      .single();
    
    if (categoryError || !categoryData) {
      console.error('Category lookup error:', categoryError);
      return NextResponse.json(
        { error: 'Invalid category', details: categoryError?.message },
        { status: 400 }
      );
    }
    
    // Insert article
    const { data: article, error } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        content,
        excerpt,
        category_id: categoryData.id,
        read_time: `${readTime || 5} min`,
        language: 'en',
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Insert data was:', {
        title,
        slug,
        content,
        excerpt,
        category_id: categoryData.id,
        read_time: `${readTime || 5} min`,
        language: 'en',
        published_at: status === 'published' ? new Date().toISOString() : null,
      });
      return NextResponse.json(
        { error: 'Failed to create article', details: error.message, code: error.code },
        { status: 500 }
      );
    }
    
    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article', details: error.message },
      { status: 500 }
    );
  }
}
