const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://shmm333:wYelXQxQrnYPkUhf@islamic-sourcses.0zgxypg.mongodb.net/?retryWrites=true&w=majority&appName=Islamic-Sourcses';

// Post Schema
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  excerpt: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['Fiqh', 'Aqeedah', 'Hadith', 'Tafsir', 'Seerah', 'General'] },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  author: { type: String, default: 'Admin' },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: true },
}, { timestamps: true });

// Question Schema
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, maxlength: 500 },
  answer: { type: String, required: true },
  category: { type: String, required: true, enum: ['Fiqh', 'Aqeedah', 'Hadith', 'Tafsir', 'Seerah', 'General'] },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  scholar: { type: String, default: 'Anonymous Scholar' },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: true },
}, { timestamps: true });

// Article Schema
const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  excerpt: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['Fiqh', 'Aqeedah', 'Hadith', 'Tafsir', 'Seerah', 'General'] },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  author: { type: String, default: 'Admin' },
  readTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: true },
}, { timestamps: true });

// Media Schema
const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  type: { type: String, required: true, enum: ['pdf', 'audio', 'video', 'image'] },
  category: { type: String, required: true, enum: ['Fiqh', 'Aqeedah', 'Hadith', 'Tafsir', 'Seerah', 'General'] },
  tags: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number },
  speaker: { type: String },
  duration: { type: Number },
  thumbnail: { type: String },
  dimensions: { width: Number, height: Number },
  downloads: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: true },
}, { timestamps: true });

// Create models
const Post = mongoose.model('Post', PostSchema);
const Question = mongoose.model('Question', QuestionSchema);
const Article = mongoose.model('Article', ArticleSchema);
const Media = mongoose.model('Media', MediaSchema);

// Sample data
const posts = [
  {
    title: "The Importance of Following the Salaf",
    excerpt: "Understanding the significance of following the righteous predecessors and their methodology in understanding Islam.",
    content: `The term "Salaf" refers to the first three generations of Muslims: the Companions of the Prophet (صلى الله عليه وسلم), their followers (Tabi'een), and the followers of the followers (Tabi' Tabi'een). 

Following the Salaf is crucial because they were the closest to the time of the Prophet (صلى الله عليه وسلم) and had the purest understanding of Islam. They received the religion directly from the Prophet and his companions, without any innovations or deviations.

The Prophet (صلى الله عليه وسلم) said: "The best of my Ummah is my generation, then those who follow them, then those who follow them." This hadith emphasizes the excellence of the Salaf and the importance of following their path.

Key principles of following the Salaf include:
1. Adhering to the Quran and Sunnah
2. Understanding Islam as the Salaf understood it
3. Avoiding innovations in religion
4. Following the consensus of the scholars
5. Maintaining unity and avoiding division

This methodology ensures that we follow the pure, unadulterated Islam that was revealed to the Prophet (صلى الله عليه وسلم) and practiced by the early generations.`,
    category: "Aqeedah",
    tags: ["salaf", "aqeedah", "methodology", "islam"],
    status: "published",
    author: "Shaykh Abdul Aziz bin Baz",
    views: 1250
  },
  {
    title: "The Correct Understanding of Tawheed",
    excerpt: "A comprehensive explanation of the three categories of Tawheed and their importance in Islamic belief.",
    content: `Tawheed (monotheism) is the foundation of Islamic belief and consists of three categories:

1. Tawheed ar-Ruboobiyyah (Oneness of Lordship): This refers to believing that Allah alone is the Creator, Sustainer, and Controller of all things. He alone gives life and death, provides sustenance, and manages all affairs of the universe.

2. Tawheed al-Uloohiyyah (Oneness of Worship): This means that all acts of worship must be directed to Allah alone. This includes prayer, fasting, charity, supplication, and all other forms of worship.

3. Tawheed al-Asma' was-Sifaat (Oneness of Names and Attributes): This involves believing in Allah's names and attributes as they are mentioned in the Quran and authentic hadith, without distortion, denial, or anthropomorphism.

The Prophet (صلى الله عليه وسلم) said: "Whoever dies while knowing that none has the right to be worshipped except Allah will enter Paradise." This emphasizes the importance of correct Tawheed.

Common mistakes in understanding Tawheed include:
- Associating partners with Allah in worship
- Denying Allah's attributes
- Making intermediaries between oneself and Allah
- Following superstitions and fortune-telling

It is essential to learn Tawheed from reliable scholars who follow the methodology of the Salaf.`,
    category: "Aqeedah",
    tags: ["tawheed", "monotheism", "aqeedah", "belief"],
    status: "published",
    author: "Shaykh Muhammad bin Abdul Wahhab",
    views: 2100
  },
  {
    title: "The Methodology of the Salaf in Seeking Knowledge",
    excerpt: "How the righteous predecessors approached Islamic knowledge and the proper way to seek religious education.",
    content: `The Salaf had a specific methodology in seeking Islamic knowledge that we should follow today:

1. Starting with the fundamentals: They began with learning the basics of Tawheed, the pillars of Islam, and essential Islamic etiquette before moving to more advanced topics.

2. Learning from reliable scholars: They only took knowledge from scholars known for their piety, knowledge, and adherence to the Sunnah.

3. Memorizing and understanding: They emphasized memorizing the Quran and authentic hadith while understanding their meanings.

4. Practical application: They applied what they learned in their daily lives and taught others.

5. Avoiding innovations: They stayed away from newly invented matters in religion and stuck to what was authentically transmitted.

The Prophet (صلى الله عليه وسلم) said: "Whoever Allah wants good for, He gives him understanding of the religion." This shows that seeking knowledge is a sign of Allah's favor.

Important principles for seeking knowledge:
- Have sincere intention for Allah's sake
- Start with the basics and build gradually
- Learn from qualified scholars
- Apply what you learn
- Teach others what you know
- Be patient and consistent

This methodology ensures that we acquire knowledge correctly and avoid the pitfalls of ignorance and innovation.`,
    category: "General",
    tags: ["knowledge", "methodology", "salaf", "education"],
    status: "published",
    author: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 890
  }
];

const questions = [
  {
    question: "What is the ruling on celebrating the Prophet's birthday (Mawlid)?",
    answer: `Celebrating the Prophet's birthday (Mawlid) is an innovation (bid'ah) that was not practiced by the Prophet (صلى الله عليه وسلم), his companions, or the righteous predecessors.

The Prophet (صلى الله عليه وسلم) said: "Whoever introduces something into this matter of ours that is not part of it will have it rejected." This hadith clearly indicates that any religious practice not established by the Prophet is rejected.

The companions and the Salaf never celebrated the Prophet's birthday. This practice was introduced centuries after the Prophet's death and is therefore an innovation.

Instead of celebrating birthdays, Muslims should:
1. Follow the Sunnah of the Prophet (صلى الله عليه وسلم)
2. Learn about his life and teachings
3. Implement his guidance in daily life
4. Invite others to follow the correct path

The best way to honor the Prophet is by following his teachings and spreading his message, not by inventing new celebrations.`,
    category: "Fiqh",
    tags: ["mawlid", "bidah", "innovation", "prophet"],
    status: "published",
    scholar: "Shaykh Abdul Aziz bin Baz",
    views: 1560
  },
  {
    question: "Is it permissible to make dua through the Prophet or other righteous people?",
    answer: `No, it is not permissible to make dua through the Prophet (صلى الله عليه وسلم) or any other person, living or dead. This is a form of shirk (associating partners with Allah).

Allah says in the Quran: "And your Lord said: 'Invoke Me, I will respond to your invocation.'" (40:60) This verse shows that we should call upon Allah directly.

The Prophet (صلى الله عليه وسلم) said: "Dua is worship." Since worship is only for Allah, making dua through intermediaries is a form of shirk.

The correct way to make dua:
1. Call upon Allah directly
2. Use the beautiful names of Allah
3. Ask for what is permissible
4. Be sincere and humble
5. Have good expectations of Allah

Examples of correct dua:
- "O Allah, forgive me"
- "O Allah, guide me to the straight path"
- "O Allah, grant me beneficial knowledge"

Making dua through intermediaries is a major sin and contradicts the fundamental principle of Tawheed.`,
    category: "Aqeedah",
    tags: ["dua", "shirk", "tawheed", "worship"],
    status: "published",
    scholar: "Shaykh Muhammad bin Abdul Wahhab",
    views: 980
  },
  {
    question: "What is the ruling on listening to music and singing?",
    answer: `The majority of scholars, including the Salaf, consider listening to music and singing to be haram (forbidden) based on authentic evidence from the Quran and Sunnah.

Allah says: "And of mankind is he who purchases idle talks to mislead from the path of Allah without knowledge, and takes it by way of mockery. For such there will be a humiliating torment." (31:6) The companions interpreted "idle talks" as referring to music and singing.

The Prophet (صلى الله عليه وسلم) said: "There will be people from my Ummah who will consider as lawful: fornication, the wearing of silk, wine, and musical instruments." This hadith clearly indicates that musical instruments are forbidden.

Exceptions to this ruling:
1. The duff (tambourine) at weddings (for women only)
2. Nasheeds without musical instruments
3. Recitation of the Quran with beautiful voice

The negative effects of music include:
- Distracting from the remembrance of Allah
- Encouraging sinful behavior
- Wasting time that could be spent in worship
- Influencing emotions negatively

Muslims should avoid music and instead listen to the Quran, beneficial lectures, and Islamic nasheeds without instruments.`,
    category: "Fiqh",
    tags: ["music", "singing", "haram", "entertainment"],
    status: "published",
    scholar: "Shaykh Muhammad bin Salih al-Uthaymeen",
    views: 1340
  }
];

const articles = [
  {
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
    views: 1670
  },
  {
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
    views: 1120
  }
];

const media = [
  {
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
    views: 1800
  },
  {
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
    views: 650
  },
  {
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
    views: 2100
  }
];

// Helper function to create slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function populateDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Question.deleteMany({});
    await Article.deleteMany({});
    await Media.deleteMany({});
    console.log('Cleared existing data');

    // Add slugs to all data
    posts.forEach(post => {
      post.slug = createSlug(post.title);
    });
    questions.forEach(question => {
      question.slug = createSlug(question.question);
    });
    articles.forEach(article => {
      article.slug = createSlug(article.title);
    });
    media.forEach(mediaItem => {
      mediaItem.slug = createSlug(mediaItem.title);
    });

    // Insert data
    await Post.insertMany(posts);
    await Question.insertMany(questions);
    await Article.insertMany(articles);
    await Media.insertMany(media);

    console.log('Database populated successfully!');
    console.log(`Inserted ${posts.length} posts`);
    console.log(`Inserted ${questions.length} questions`);
    console.log(`Inserted ${articles.length} articles`);
    console.log(`Inserted ${media.length} media items`);

  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

populateDatabase(); 