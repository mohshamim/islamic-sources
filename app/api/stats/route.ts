import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get counts from each table
    const [
      { count: articlesCount },
      { count: questionsCount },
      { count: mediaCount },
    ] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('questions').select('*', { count: 'exact', head: true }),
      supabase.from('media').select('*', { count: 'exact', head: true }),
    ]);
    
    // Get recent activity (last 5 items from each type)
    const { data: recentArticles } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        excerpt,
        slug,
        views,
        read_time,
        created_at,
        published_at,
        categories (name),
        scholars (name, title)
      `)
      .order('created_at', { ascending: false })
      .limit(5);
    
    const { data: recentQuestions } = await supabase
      .from('questions')
      .select(`
        id,
        question,
        answer,
        slug,
        views,
        status,
        created_at,
        categories (name),
        scholars (name, title)
      `)
      .order('created_at', { ascending: false })
      .limit(5);
    
    const { data: recentMedia } = await supabase
      .from('media')
      .select(`
        id,
        title,
        type,
        views,
        created_at,
        categories (name)
      `)
      .order('created_at', { ascending: false })
      .limit(5);
    
    // Get total views
    const { data: articlesViews } = await supabase
      .from('articles')
      .select('views');
    
    const { data: questionsViews } = await supabase
      .from('questions')
      .select('views');
    
    const { data: mediaViews } = await supabase
      .from('media')
      .select('views');
    
    const totalArticleViews = articlesViews?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;
    const totalQuestionViews = questionsViews?.reduce((sum, q) => sum + (q.views || 0), 0) || 0;
    const totalMediaViews = mediaViews?.reduce((sum, m) => sum + (m.views || 0), 0) || 0;
    
    // Get category distribution
    const { data: articleCategories } = await supabase
      .from('articles')
      .select(`
        categories (
          id,
          name
        )
      `);
    
    const categoryDistribution = articleCategories?.reduce((acc: any, item: any) => {
      const catName = item.categories?.name || 'Uncategorized';
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {}) || {};
    
    const categoryArray = Object.entries(categoryDistribution).map(([name, count]) => ({
      _id: name,
      count
    }));
    
    return NextResponse.json({
      counts: {
        questions: questionsCount || 0,
        articles: articlesCount || 0,
        media: mediaCount || 0,
        total: (questionsCount || 0) + (articlesCount || 0) + (mediaCount || 0),
      },
      views: {
        total: totalArticleViews + totalQuestionViews + totalMediaViews,
        questions: totalQuestionViews,
        articles: totalArticleViews,
        media: totalMediaViews,
      },
      recentActivity: {
        questions: recentQuestions || [],
        articles: recentArticles || [],
        media: recentMedia || [],
      },
      categories: {
        questions: categoryArray,
        articles: categoryArray,
        media: categoryArray,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    
    // Return empty stats when there's an error
    return NextResponse.json({
      counts: {
        questions: 0,
        articles: 0,
        media: 0,
        total: 0,
      },
      views: {
        total: 0,
        questions: 0,
        articles: 0,
        media: 0,
      },
      recentActivity: {
        questions: [],
        articles: [],
        media: [],
      },
      categories: {
        questions: [],
        articles: [],
        media: [],
      },
    });
  }
}
