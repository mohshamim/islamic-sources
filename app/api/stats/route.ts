import { NextRequest, NextResponse } from 'next/server';

// Temporary static data while we fix database connection
const staticPosts = [
  {
    _id: "1",
    title: "The Importance of Following the Salaf",
    excerpt: "Understanding the significance of following the righteous predecessors and their methodology in understanding Islam.",
    category: "Aqeedah",
    tags: ["salaf", "aqeedah", "methodology", "islam"],
    status: "published",
    author: "Shaykh Abdul Aziz bin Baz",
    views: 1250,
    slug: "the-importance-of-following-the-salaf",
    createdAt: "2024-12-15T10:00:00Z"
  },
  {
    _id: "2",
    title: "The Correct Understanding of Tawheed",
    excerpt: "A comprehensive explanation of the three categories of Tawheed and their importance in Islamic belief.",
    category: "Aqeedah",
    tags: ["tawheed", "monotheism", "aqeedah", "belief"],
    status: "published",
    author: "Shaykh Muhammad bin Abdul Wahhab",
    views: 2100,
    slug: "the-correct-understanding-of-tawheed",
    createdAt: "2024-12-14T10:00:00Z"
  },
  {
    _id: "3",
    title: "The Methodology of the Salaf in Seeking Knowledge",
    excerpt: "How the righteous predecessors approached Islamic knowledge and the proper way to seek religious education.",
    category: "General",
    tags: ["knowledge", "methodology", "salaf", "education"],
    status: "published",
    author: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 890,
    slug: "the-methodology-of-the-salaf-in-seeking-knowledge",
    createdAt: "2024-12-13T10:00:00Z"
  }
];

const staticQuestions = [
  {
    _id: "1",
    question: "What is the ruling on celebrating the Prophet's birthday (Mawlid)?",
    answer: "Celebrating the Prophet's birthday (Mawlid) is an innovation (bid'ah) that was not practiced by the Prophet (صلى الله عليه وسلم), his companions, or the righteous predecessors.",
    category: "Fiqh",
    tags: ["mawlid", "bidah", "innovation", "prophet"],
    status: "published",
    scholar: "Shaykh Abdul Aziz bin Baz",
    views: 1560,
    slug: "ruling-on-celebrating-prophets-birthday",
    createdAt: "2024-12-15T10:00:00Z"
  },
  {
    _id: "2",
    question: "Is it permissible to make dua through the Prophet or other righteous people?",
    answer: "No, it is not permissible to make dua through the Prophet (صلى الله عليه وسلم) or any other person, living or dead. This is a form of shirk (associating partners with Allah).",
    category: "Aqeedah",
    tags: ["dua", "shirk", "tawheed", "worship"],
    status: "published",
    scholar: "Shaykh Muhammad bin Abdul Wahhab",
    views: 980,
    slug: "making-dua-through-prophet-or-others",
    createdAt: "2024-12-14T10:00:00Z"
  },
  {
    _id: "3",
    question: "What is the ruling on listening to music and singing?",
    answer: "The majority of scholars, including the Salaf, consider listening to music and singing to be haram (forbidden) based on authentic evidence from the Quran and Sunnah.",
    category: "Fiqh",
    tags: ["music", "singing", "haram", "entertainment"],
    status: "published",
    scholar: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 1340,
    slug: "ruling-on-listening-to-music",
    createdAt: "2024-12-13T10:00:00Z"
  }
];

const staticArticles = [
  {
    _id: "1",
    title: "The Life and Methodology of Imam Ahmad bin Hanbal",
    excerpt: "A detailed biography of one of the greatest scholars of Islam and his contributions to Islamic knowledge.",
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

// Temporary static media data
const staticMedia = [
  {
    _id: "1",
    title: "Tawheed: The Foundation of Islam",
    description: "A comprehensive lecture on the importance and categories of Tawheed",
    type: "audio",
    category: "Aqeedah",
    tags: ["tawheed", "aqeedah", "lecture"],
    status: "published",
    fileUrl: "https://example.com/audio/tawheed-foundation.mp3",
    fileName: "tawheed-foundation.mp3",
    fileSize: 25000000,
    speaker: "Shaykh Abdul Aziz bin Baz",
    duration: 3600,
    downloads: 450,
    plays: 1200,
    views: 1800,
    createdAt: "2024-12-15T10:00:00Z"
  },
  {
    _id: "2",
    title: "The Methodology of the Salaf",
    description: "PDF document explaining the methodology of the righteous predecessors",
    type: "pdf",
    category: "General",
    tags: ["salaf", "methodology", "pdf"],
    status: "published",
    fileUrl: "https://example.com/pdf/salaf-methodology.pdf",
    fileName: "salaf-methodology.pdf",
    fileSize: 1500000,
    downloads: 320,
    views: 650,
    createdAt: "2024-12-14T10:00:00Z"
  },
  {
    _id: "3",
    title: "Understanding the Quran",
    description: "Video lecture series on proper Quran interpretation",
    type: "video",
    category: "Tafsir",
    tags: ["quran", "tafsir", "interpretation"],
    status: "published",
    fileUrl: "https://example.com/video/quran-understanding.mp4",
    fileName: "quran-understanding.mp4",
    fileSize: 500000000,
    thumbnail: "https://example.com/thumbnails/quran-lecture.jpg",
    speaker: "Shaykh Muhammad bin Salih al-Uthaymeen",
    duration: 7200,
    downloads: 180,
    plays: 890,
    views: 2100,
    createdAt: "2024-12-13T10:00:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    // Get counts for each content type
    const postsCount = staticPosts.length;
    const questionsCount = staticQuestions.length;
    const articlesCount = staticArticles.length;
    const mediaCount = staticMedia.length;
    
    // Get recent activity (last 5 items from each type)
    const recentPosts = staticPosts.slice(0, 5);
    const recentQuestions = staticQuestions.slice(0, 5);
    const recentArticles = staticArticles.slice(0, 5);
    const recentMedia = staticMedia.slice(0, 5);
    
    // Get total views across all content types
    const postsViews = staticPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const questionsViews = staticQuestions.reduce((sum, question) => sum + (question.views || 0), 0);
    const articlesViews = staticArticles.reduce((sum, article) => sum + (article.views || 0), 0);
    const mediaViews = staticMedia.reduce((sum, media) => sum + (media.views || 0), 0);
    
    const totalViews = postsViews + questionsViews + articlesViews + mediaViews;
    
    // Get category distribution
    const postsByCategory = getCategoryDistribution(staticPosts);
    const questionsByCategory = getCategoryDistribution(staticQuestions);
    const articlesByCategory = getCategoryDistribution(staticArticles);
    const mediaByCategory = getCategoryDistribution(staticMedia);
    
    return NextResponse.json({
      counts: {
        posts: postsCount,
        questions: questionsCount,
        articles: articlesCount,
        media: mediaCount,
        total: postsCount + questionsCount + articlesCount + mediaCount,
      },
      views: {
        total: totalViews,
        posts: postsViews,
        questions: questionsViews,
        articles: articlesViews,
        media: mediaViews,
      },
      recentActivity: {
        posts: recentPosts,
        questions: recentQuestions,
        articles: recentArticles,
        media: recentMedia,
      },
      categories: {
        posts: postsByCategory,
        questions: questionsByCategory,
        articles: articlesByCategory,
        media: mediaByCategory,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

// Helper function to get category distribution
function getCategoryDistribution(items: Array<{ category: string }>) {
  const distribution: { [key: string]: number } = {};
  
  items.forEach(item => {
    const category = item.category;
    distribution[category] = (distribution[category] || 0) + 1;
  });
  
  return Object.entries(distribution)
    .map(([_id, count]) => ({ _id, count }))
    .sort((a, b) => (b.count as number) - (a.count as number));
} 