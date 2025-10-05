// Fallback data when database is not available
export const fallbackPosts = [
  {
    _id: "1",
    title: "The Importance of Following the Sunnah in Daily Life",
    excerpt: "How to implement the teachings of the Prophet in our everyday activities and interactions.",
    content: "The Prophet (صلى الله عليه وسلم) said: 'Whoever revives my Sunnah when my Ummah is corrupt will have the reward of a hundred martyrs.' This shows the importance of following and spreading the Sunnah.",
    category: "General",
    tags: ["sunnah", "prophet", "daily life"],
    status: "published",
    author: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 1120,
    slug: "sunnah-daily-life",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2", 
    title: "The Methodology of the Salaf in Seeking Knowledge",
    excerpt: "How the righteous predecessors approached Islamic knowledge and the proper way to seek religious education.",
    content: "The Salaf had a specific methodology in seeking Islamic knowledge that we should follow today. They started with the fundamentals and learned from reliable scholars.",
    category: "General",
    tags: ["knowledge", "methodology", "salaf"],
    status: "published",
    author: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 890,
    slug: "salaf-methodology",
    createdAt: new Date().toISOString(),
  },
];

export const fallbackQuestions = [
  {
    _id: "1",
    question: "What is the correct way to perform ablution (wudu)?",
    answer: "The correct way to perform ablution involves washing the hands, mouth, nose, face, arms, head, ears, and feet in the specific order mentioned in the Sunnah.",
    category: "Fiqh",
    tags: ["wudu", "ablution", "prayer"],
    status: "published",
    scholar: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 1890,
    slug: "correct-ablution",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    question: "How should we deal with non-Muslims according to Islamic teachings?",
    answer: "Islam teaches us to treat non-Muslims with kindness, justice, and respect while maintaining our Islamic identity and values.",
    category: "General",
    tags: ["non-muslims", "relationships", "ethics"],
    status: "published",
    scholar: "Shaykh Abdul Aziz bin Baz",
    views: 1560,
    slug: "dealing-non-muslims",
    createdAt: new Date().toISOString(),
  },
];

export const fallbackArticles = [
  {
    _id: "1",
    title: "The Life and Methodology of Imam Ahmad bin Hanbal",
    excerpt: "A detailed biography of one of the greatest scholars of Islam and his contributions to Islamic knowledge.",
    content: "Imam Ahmad bin Hanbal (164-241 AH) was one of the greatest scholars of Islam and the founder of the Hanbali school of thought. He was born in Baghdad and showed exceptional intelligence from a young age.",
    category: "Seerah",
    tags: ["imam ahmad", "hanbali", "scholars"],
    status: "published",
    author: "Shaykh Abdul Aziz bin Baz",
    readTime: 8,
    views: 1670,
    slug: "imam-ahmad-hanbal",
    createdAt: new Date().toISOString(),
  },
];

export const fallbackStats = {
  counts: {
    posts: fallbackPosts.length,
    questions: fallbackQuestions.length,
    articles: fallbackArticles.length,
    media: 0,
    total: fallbackPosts.length + fallbackQuestions.length + fallbackArticles.length,
  },
  views: {
    total: 5670,
    posts: 3260,
    questions: 4790,
    articles: 4895,
  },
};
