import { NextRequest, NextResponse } from 'next/server';

// Temporary static data while we fix database connection
const staticArticles = [
  {
    _id: "1",
    title: "The Life and Methodology of Imam Ahmad bin Hanbal",
    excerpt: "A detailed biography of one of the greatest scholars of Islam and his contributions to Islamic knowledge.",
    content: `Imam Ahmad bin Hanbal (164-241 AH) was one of the greatest scholars of Islam and the founder of the Hanbali school of thought. He was born in Baghdad and showed exceptional intelligence from a young age.

His teachers included:
- Imam Abu Yusuf (student of Imam Abu Hanifah)
- Imam al-Shafi'i
- Many other prominent scholars of his time

Imam Ahmad is most famous for his steadfastness during the Mihnah (Inquisition) when he refused to accept the Mu'tazili belief that the Quran was created. Despite being imprisoned and tortured, he remained firm in his belief.

His major works include:
1. Musnad Ahmad - A collection of over 30,000 hadith
2. Kitab as-Sunnah - A book on Islamic beliefs
3. Kitab az-Zuhd - A book on asceticism

Key principles of Imam Ahmad's methodology:
- Strict adherence to the Quran and Sunnah
- Following the consensus of the companions
- Using analogy (qiyas) only when necessary
- Avoiding innovations and newly invented matters

Imam Ahmad's legacy continues to influence Islamic scholarship today, particularly in the Salafi methodology. His emphasis on following the authentic sources and avoiding innovations is a cornerstone of correct Islamic practice.`,
    category: "Seerah",
    tags: ["imam ahmad", "hanbali", "scholars", "methodology"],
    status: "published",
    author: "Shaykh Abdul Aziz bin Baz",
    readTime: 8,
    views: 1670,
    slug: "life-and-methodology-of-imam-ahmad",
    createdAt: "2024-12-15T10:00:00Z"
  },
  {
    _id: "2",
    title: "The Importance of Following the Sunnah in Daily Life",
    excerpt: "How to implement the teachings of the Prophet in our everyday activities and interactions.",
    content: `Following the Sunnah of the Prophet (صلى الله عليه وسلم) is essential for every Muslim. The Sunnah provides guidance for every aspect of life, from personal hygiene to social interactions.

Daily Sunnah practices include:
1. Morning and evening adhkar (remembrance)
2. Following the Prophet's eating etiquette
3. Maintaining good character and manners
4. Regular prayer and worship
5. Treating family and neighbors with kindness

The Prophet (صلى الله عليه وسلم) said: "Whoever revives my Sunnah when my Ummah is corrupt will have the reward of a hundred martyrs." This shows the importance of following and spreading the Sunnah.

Benefits of following the Sunnah:
- Increased reward and blessings
- Protection from sins and mistakes
- Unity and harmony in the community
- Following the best example (the Prophet)
- Success in this life and the hereafter

Practical ways to implement the Sunnah:
- Learn authentic hadith from reliable sources
- Start with easy practices and gradually increase
- Be consistent and patient
- Teach others what you learn
- Avoid innovations and newly invented matters

Following the Sunnah is not just about religious rituals but encompasses all aspects of life, making us better Muslims and better human beings.`,
    category: "General",
    tags: ["sunnah", "prophet", "daily life", "practice"],
    status: "published",
    author: "Shaykh Muhammad bin Salih al-Uthaymeen",
    readTime: 6,
    views: 1120,
    slug: "importance-of-following-sunnah",
    createdAt: "2024-12-14T10:00:00Z"
  }
];

// GET all articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    let filteredArticles = staticArticles;
    
    // Apply filters
    if (category) {
      filteredArticles = filteredArticles.filter(article => article.category === category);
    }
    if (status) {
      filteredArticles = filteredArticles.filter(article => article.status === status);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply pagination
    const skip = (page - 1) * limit;
    const paginatedArticles = filteredArticles.slice(skip, skip + limit);
    
    return NextResponse.json({
      articles: paginatedArticles,
      pagination: {
        page,
        limit,
        total: filteredArticles.length,
        pages: Math.ceil(filteredArticles.length / limit),
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
    const body = await request.json();
    const { title, excerpt, content, category, tags, status, author, readTime } = body;
    
    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new article (in a real app, this would save to database)
    const newArticle = {
      _id: Date.now().toString(),
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      status: status || 'draft',
      author: author || 'Admin',
      readTime: readTime || 5,
      views: 0,
      slug: title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'),
      createdAt: new Date().toISOString()
    };
    
    // Add to static data (in a real app, this would be saved to database)
    staticArticles.unshift(newArticle);
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article', details: error.message },
      { status: 500 }
    );
  }
} 