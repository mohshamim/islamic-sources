-- ============================================
-- SAMPLE COURSE CONTENT
-- ============================================
-- This file contains sample modules, lessons, and content for existing courses

-- ============================================
-- SAMPLE CONTENT FOR "SPOKEN ARABIC FOR BEGINNERS"
-- ============================================

-- Get the course ID for "Spoken Arabic for Beginners"
DO $$
DECLARE
    arabic_course_id UUID;
    module1_id UUID;
    module2_id UUID;
    module3_id UUID;
    module4_id UUID;
    lesson1_id UUID;
    lesson2_id UUID;
    lesson3_id UUID;
    lesson4_id UUID;
    lesson5_id UUID;
    lesson6_id UUID;
    lesson7_id UUID;
    lesson8_id UUID;
BEGIN
    -- Get the course ID
    SELECT id INTO arabic_course_id FROM courses WHERE slug = 'spoken-arabic-for-beginners';
    
    IF arabic_course_id IS NOT NULL THEN
        -- Module 1: Basic Greetings and Introductions
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            arabic_course_id,
            'Basic Greetings and Introductions',
            'Learn essential Arabic greetings, polite expressions, and how to introduce yourself in Arabic.',
            1
        ) RETURNING id INTO module1_id;

        -- Module 2: Daily Conversations
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            arabic_course_id,
            'Daily Conversations',
            'Master common daily conversations including shopping, asking for directions, and ordering food.',
            2
        ) RETURNING id INTO module2_id;

        -- Module 3: Family and Relationships
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            arabic_course_id,
            'Family and Relationships',
            'Learn to talk about your family, relationships, and describe people in Arabic.',
            3
        ) RETURNING id INTO module3_id;

        -- Module 4: Cultural Context and Etiquette
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            arabic_course_id,
            'Cultural Context and Etiquette',
            'Understand Arabic culture, social customs, and appropriate behavior in different situations.',
            4
        ) RETURNING id INTO module4_id;

        -- Lesson 1: Essential Greetings
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module1_id,
            'Essential Greetings',
            'Learn the most important Arabic greetings and when to use them.',
            'video',
            'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            15,
            true,
            1,
            '<h3>Essential Arabic Greetings</h3>
            <p>Arabic greetings are an important part of daily communication and show respect for others. Here are the most common ones:</p>
            <ul>
                <li><strong>السلام عليكم (As-salamu alaykum)</strong> - Peace be upon you (most common greeting)</li>
                <li><strong>وعليكم السلام (Wa alaykum as-salam)</strong> - And peace be upon you (response)</li>
                <li><strong>أهلاً وسهلاً (Ahlan wa sahlan)</strong> - Welcome</li>
                <li><strong>مرحباً (Marhaban)</strong> - Hello</li>
                <li><strong>صباح الخير (Sabah al-khayr)</strong> - Good morning</li>
                <li><strong>مساء الخير (Masa al-khayr)</strong> - Good evening</li>
            </ul>
            <h4>Cultural Notes:</h4>
            <p>When greeting someone in Arabic culture, it is customary to:</p>
            <ul>
                <li>Use the right hand for handshakes</li>
                <li>Make eye contact and smile</li>
                <li>Wait for the other person to initiate physical contact</li>
                <li>Use appropriate greetings based on the time of day</li>
            </ul>',
            '<h3>Practice Exercise: Greeting Scenarios</h3>
            <p><strong>Scenario 1:</strong> You meet a friend in the morning at 9 AM. What greeting would you use?</p>
            <p><strong>Answer:</strong> صباح الخير (Sabah al-khayr) - Good morning</p>
            
            <p><strong>Scenario 2:</strong> Someone greets you with "السلام عليكم". How do you respond?</p>
            <p><strong>Answer:</strong> وعليكم السلام (Wa alaykum as-salam)</p>
            
            <p><strong>Scenario 3:</strong> A guest arrives at your home. What welcome greeting would you use?</p>
            <p><strong>Answer:</strong> أهلاً وسهلاً (Ahlan wa sahlan) - Welcome</p>
            
            <h4>Practice Phrases:</h4>
            <ol>
                <li>Try greeting a family member using "السلام عليكم"</li>
                <li>Practice saying "أهلاً وسهلاً" when welcoming someone</li>
                <li>Use "صباح الخير" in the morning and "مساء الخير" in the evening</li>
            </ol>',
            ARRAY['Learn basic Arabic greetings', 'Understand cultural context of greetings', 'Practice appropriate responses']
        ) RETURNING id INTO lesson1_id;

        -- Lesson 2: Introducing Yourself
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module1_id,
            'Introducing Yourself',
            'Learn how to introduce yourself in Arabic with your name, occupation, and nationality.',
            'video',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            20,
            false,
            2,
            '<h3>Self-Introduction in Arabic</h3>
            <p>When introducing yourself in Arabic, you''ll want to include basic information about yourself. Here are the key phrases:</p>
            
            <h4>Basic Introduction Phrases:</h4>
            <ul>
                <li><strong>أنا (Ana)</strong> - I am</li>
                <li><strong>اسمي (Ismi)</strong> - My name is</li>
                <li><strong>أنا من (Ana min)</strong> - I am from</li>
                <li><strong>أعمل في (A''mal fi)</strong> - I work in</li>
                <li><strong>أدرس (Adrus)</strong> - I study</li>
            </ul>
            
            <h4>Example Introduction:</h4>
            <p><strong>السلام عليكم، اسمي أحمد، أنا من مصر، وأعمل مهندس.</strong></p>
            <p><em>Peace be upon you, my name is Ahmed, I am from Egypt, and I work as an engineer.</em></p>
            
            <h4>Countries and Nationalities:</h4>
            <ul>
                <li><strong>مصر (Misr)</strong> - Egypt / <strong>مصري (Misri)</strong> - Egyptian</li>
                <li><strong>السعودية (As-Saudiyya)</strong> - Saudi Arabia / <strong>سعودي (Saudi)</strong> - Saudi</li>
                <li><strong>الأردن (Al-Urdun)</strong> - Jordan / <strong>أردني (Urduni)</strong> - Jordanian</li>
                <li><strong>المغرب (Al-Maghrib)</strong> - Morocco / <strong>مغربي (Maghribi)</strong> - Moroccan</li>
            </ul>',
            '<h3>Practice: Create Your Own Introduction</h3>
            <p>Write and practice introducing yourself using the following template:</p>
            
            <p><strong>Template:</strong></p>
            <p>السلام عليكم، اسمي [Your Name]، أنا من [Your Country]، وأعمل [Your Job/Student].</p>
            
            <h4>Practice Scenarios:</h4>
            <ol>
                <li>Introduce yourself at a business meeting</li>
                <li>Introduce yourself to new neighbors</li>
                <li>Introduce yourself at a social gathering</li>
            </ol>
            
            <h4>Role Play Exercise:</h4>
            <p>Practice with a partner - one person asks "ما اسمك؟" (What is your name?) and the other responds with a full introduction.</p>',
            ARRAY['Learn self-introduction phrases', 'Practice talking about nationality and occupation', 'Build confidence in basic conversations']
        ) RETURNING id INTO lesson2_id;

        -- Lesson 3: Shopping Conversations
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module2_id,
            'Shopping Conversations',
            'Learn essential phrases for shopping, asking about prices, and making purchases.',
            'video',
            'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            25,
            false,
            1,
            '<h3>Shopping in Arabic</h3>
            <p>Shopping is a common daily activity. Here are essential phrases you''ll need:</p>
            
            <h4>Basic Shopping Phrases:</h4>
            <ul>
                <li><strong>كم هذا؟ (Kam hatha?)</strong> - How much is this?</li>
                <li><strong>هل عندك...؟ (Hal ''indak...?)</strong> - Do you have...?</li>
                <li><strong>أريد أن أشتري (Ureed an ashtari)</strong> - I want to buy</li>
                <li><strong>أين أدفع؟ (Ayna adfa''?)</strong> - Where do I pay?</li>
                <li><strong>هل تقبل بطاقة الائتمان؟ (Hal taqbal bitaqat al-i''timan?)</strong> - Do you accept credit cards?</li>
            </ul>
            
            <h4>Numbers and Prices:</h4>
            <ul>
                <li><strong>واحد (Wahid)</strong> - One</li>
                <li><strong>اثنان (Ithnan)</strong> - Two</li>
                <li><strong>ثلاثة (Thalatha)</strong> - Three</li>
                <li><strong>عشرة (Ashara)</strong> - Ten</li>
                <li><strong>عشرون (Ishrun)</strong> - Twenty</li>
                <li><strong>مائة (Mi''a)</strong> - One hundred</li>
            </ul>
            
            <h4>Currency:</h4>
            <ul>
                <li><strong>ريال (Riyal)</strong> - Riyal (Saudi, Qatari, etc.)</li>
                <li><strong>دينار (Dinar)</strong> - Dinar (Jordanian, Kuwaiti, etc.)</li>
                <li><strong>جنيه (Jinayh)</strong> - Pound (Egyptian)</li>
                <li><strong>درهم (Dirham)</strong> - Dirham (UAE, Moroccan)</li>
            </ul>',
            '<h3>Shopping Role Play</h3>
            <p><strong>Scenario 1: Buying Fruits</strong></p>
            <p>Customer: السلام عليكم، هل عندك تفاح؟</p>
            <p>Shopkeeper: نعم، عندي تفاح أحمر وأخضر.</p>
            <p>Customer: كم ثمن التفاح الأحمر؟</p>
            <p>Shopkeeper: عشرة ريالات للكيلو.</p>
            <p>Customer: أريد كيلو واحد، من فضلك.</p>
            
            <h4>Practice Exercises:</h4>
            <ol>
                <li>Practice asking for prices of different items</li>
                <li>Role play buying clothes at a store</li>
                <li>Practice negotiating prices politely</li>
            </ol>
            
            <h4>Vocabulary Building:</h4>
            <p>Learn the Arabic names for common shopping items:</p>
            <ul>
                <li><strong>خبز (Khubz)</strong> - Bread</li>
                <li><strong>حليب (Haleeb)</strong> - Milk</li>
                <li><strong>لحم (Lahm)</strong> - Meat</li>
                <li><strong>خضروات (Khadrawat)</strong> - Vegetables</li>
            </ul>',
            ARRAY['Master shopping vocabulary', 'Practice price negotiations', 'Learn currency terms']
        ) RETURNING id INTO lesson3_id;

        -- Lesson 4: Asking for Directions
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module2_id,
            'Asking for Directions',
            'Learn how to ask for and give directions in Arabic.',
            'video',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            20,
            false,
            2,
            '<h3>Asking for Directions in Arabic</h3>
            <p>Getting lost is common when traveling. Here are essential phrases for asking directions:</p>
            
            <h4>Asking for Directions:</h4>
            <ul>
                <li><strong>أين...؟ (Ayna...?)</strong> - Where is...?</li>
                <li><strong>كيف أصل إلى...؟ (Kayf asil ila...?)</strong> - How do I get to...?</li>
                <li><strong>هل يمكنك مساعدتي؟ (Hal yumkinuka musa''adati?)</strong> - Can you help me?</li>
                <li><strong>أنا ضائع (Ana da''i)</strong> - I am lost</li>
            </ul>
            
            <h4>Directions and Locations:</h4>
            <ul>
                <li><strong>يسار (Yasar)</strong> - Left</li>
                <li><strong>يمين (Yameen)</strong> - Right</li>
                <li><strong>مستقيم (Mustaqeem)</strong> - Straight</li>
                <li><strong>شمال (Shamal)</strong> - North</li>
                <li><strong>جنوب (Janub)</strong> - South</li>
                <li><strong>شرق (Sharq)</strong> - East</li>
                <li><strong>غرب (Gharb)</strong> - West</li>
            </ul>
            
            <h4>Common Places:</h4>
            <ul>
                <li><strong>مطار (Matar)</strong> - Airport</li>
                <li><strong>محطة قطار (Mahattat qitar)</strong> - Train station</li>
                <li><strong>مستشفى (Mustashfa)</strong> - Hospital</li>
                <li><strong>بنك (Bank)</strong> - Bank</li>
                <li><strong>فندق (Funduq)</strong> - Hotel</li>
                <li><strong>سوق (Souq)</strong> - Market</li>
            </ul>',
            '<h3>Direction Practice Scenarios</h3>
            
            <p><strong>Scenario 1: Finding the Hotel</strong></p>
            <p>Tourist: السلام عليكم، أين الفندق الكبير؟</p>
            <p>Local: الفندق الكبير؟ اذهب مستقيم ثم انعطف يسار.</p>
            <p>Tourist: شكراً لك!</p>
            
            <h4>Practice Exercises:</h4>
            <ol>
                <li>Ask for directions to the nearest bank</li>
                <li>Practice giving directions to a tourist</li>
                <li>Learn to describe landmarks in Arabic</li>
            </ol>
            
            <h4>Useful Phrases:</h4>
            <ul>
                <li><strong>على بعد (Ala bu''d)</strong> - At a distance of</li>
                <li><strong>بجانب (Bijanib)</strong> - Next to</li>
                <li><strong>أمام (Amam)</strong> - In front of</li>
                <li><strong>خلف (Khalf)</strong> - Behind</li>
            </ul>',
            ARRAY['Learn direction vocabulary', 'Practice asking for help', 'Master location descriptions']
        ) RETURNING id INTO lesson4_id;

        -- Lesson 5: Family Members
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module3_id,
            'Family Members',
            'Learn vocabulary for family members and how to talk about your family.',
            'video',
            'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            18,
            false,
            1,
            '<h3>Family Members in Arabic</h3>
            <p>Family is very important in Arabic culture. Here are the essential family terms:</p>
            
            <h4>Immediate Family:</h4>
            <ul>
                <li><strong>أب (Ab)</strong> - Father</li>
                <li><strong>أم (Umm)</strong> - Mother</li>
                <li><strong>أخ (Akh)</strong> - Brother</li>
                <li><strong>أخت (Ukht)</strong> - Sister</li>
                <li><strong>ابن (Ibn)</strong> - Son</li>
                <li><strong>ابنة (Ibnah)</strong> - Daughter</li>
            </ul>
            
            <h4>Extended Family:</h4>
            <ul>
                <li><strong>جد (Jadd)</strong> - Grandfather</li>
                <li><strong>جدة (Jaddah)</strong> - Grandmother</li>
                <li><strong>عم (Amm)</strong> - Uncle (father''s brother)</li>
                <li><strong>خال (Khal)</strong> - Uncle (mother''s brother)</li>
                <li><strong>عمة (Ammah)</strong> - Aunt (father''s sister)</li>
                <li><strong>خالة (Khalah)</strong> - Aunt (mother''s sister)</li>
            </ul>
            
            <h4>Possessive Pronouns:</h4>
            <ul>
                <li><strong>أبي (Abi)</strong> - My father</li>
                <li><strong>أمي (Ummi)</strong> - My mother</li>
                <li><strong>أخي (Akhi)</strong> - My brother</li>
                <li><strong>أختي (Ukhti)</strong> - My sister</li>
            </ul>',
            '<h3>Family Description Practice</h3>
            
            <p><strong>Example Family Description:</strong></p>
            <p>أنا أحمد، عندي أب وأم وأخ وأخت. أبي مهندس وأمي معلمة. أخي يدرس الطب وأختي تعمل في البنك.</p>
            <p><em>I am Ahmed, I have a father, mother, brother, and sister. My father is an engineer and my mother is a teacher. My brother studies medicine and my sister works in a bank.</em></p>
            
            <h4>Practice Exercises:</h4>
            <ol>
                <li>Describe your immediate family members</li>
                <li>Talk about your siblings'' occupations</li>
                <li>Practice using possessive pronouns</li>
            </ol>
            
            <h4>Family Tree Activity:</h4>
            <p>Draw your family tree and describe it in Arabic, including:</p>
            <ul>
                <li>Names and relationships</li>
                <li>Ages and occupations</li>
                <li>Where they live</li>
            </ul>',
            ARRAY['Master family vocabulary', 'Practice possessive pronouns', 'Learn to describe family relationships']
        ) RETURNING id INTO lesson5_id;

        -- Lesson 6: Describing People
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module3_id,
            'Describing People',
            'Learn adjectives and phrases to describe people''s appearance and personality.',
            'video',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            22,
            false,
            2,
            '<h3>Describing People in Arabic</h3>
            <p>Being able to describe people helps in conversations and makes your Arabic more expressive.</p>
            
            <h4>Physical Appearance:</h4>
            <ul>
                <li><strong>طويل (Tawil)</strong> - Tall</li>
                <li><strong>قصير (Qasir)</strong> - Short</li>
                <li><strong>نحيف (Nahif)</strong> - Thin</li>
                <li><strong>سمين (Samin)</strong> - Fat</li>
                <li><strong>جميل (Jameel)</strong> - Beautiful</li>
                <li><strong>وسيم (Waseem)</strong> - Handsome</li>
                <li><strong>شاب (Shab)</strong> - Young</li>
                <li><strong>كبير (Kabeer)</strong> - Old</li>
            </ul>
            
            <h4>Personality Traits:</h4>
            <ul>
                <li><strong>لطيف (Lateef)</strong> - Kind/Nice</li>
                <li><strong>ذكي (Thaki)</strong> - Smart</li>
                <li><strong>مضحك (Mudhik)</strong> - Funny</li>
                <li><strong>هادئ (Hadi)</strong> - Quiet</li>
                <li><strong>نشيط (Nashit)</strong> - Active</li>
                <li><strong>صادق (Sadiq)</strong> - Honest</li>
            </ul>
            
            <h4>Hair and Eye Color:</h4>
            <ul>
                <li><strong>أسود (Aswad)</strong> - Black</li>
                <li><strong>بني (Bunni)</strong> - Brown</li>
                <li><strong>أشقر (Ashqar)</strong> - Blonde</li>
                <li><strong>أحمر (Ahmar)</strong> - Red</li>
                <li><strong>أزرق (Azraq)</strong> - Blue</li>
                <li><strong>أخضر (Akhdar)</strong> - Green</li>
            </ul>',
            '<h3>Person Description Practice</h3>
            
            <p><strong>Example Description:</strong></p>
            <p>صديقي محمد طويل ونحيف، شعره أسود وعيناه بنيتان. هو شخص لطيف وذكي، ويعمل مهندس.</p>
            <p><em>My friend Mohammed is tall and thin, his hair is black and his eyes are brown. He is a kind and smart person, and works as an engineer.</em></p>
            
            <h4>Practice Exercises:</h4>
            <ol>
                <li>Describe a family member''s appearance</li>
                <li>Talk about your best friend''s personality</li>
                <li>Practice describing people in photos</li>
            </ol>
            
            <h4>Guessing Game:</h4>
            <p>Describe someone in your class or family without saying their name, and let others guess who you''re talking about.</p>',
            ARRAY['Learn descriptive adjectives', 'Practice describing appearance and personality', 'Build vocabulary for character traits']
        ) RETURNING id INTO lesson6_id;

        -- Lesson 7: Arabic Cultural Etiquette
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module4_id,
            'Arabic Cultural Etiquette',
            'Understand important cultural norms and social etiquette in Arabic-speaking countries.',
            'video',
            'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            30,
            false,
            1,
            '<h3>Arabic Cultural Etiquette</h3>
            <p>Understanding cultural etiquette is crucial for building relationships and showing respect in Arabic-speaking countries.</p>
            
            <h4>Greeting Etiquette:</h4>
            <ul>
                <li><strong>Handshakes:</strong> Use the right hand only, and wait for the other person to initiate</li>
                <li><strong>Eye Contact:</strong> Maintain appropriate eye contact during conversations</li>
                <li><strong>Personal Space:</strong> Arabs tend to stand closer during conversations than Westerners</li>
                <li><strong>Gender Considerations:</strong> Be mindful of gender interactions in conservative areas</li>
            </ul>
            
            <h4>Hospitality:</h4>
            <ul>
                <li><strong>Tea and Coffee:</strong> Accepting hospitality is important - declining may be seen as rude</li>
                <li><strong>Gifts:</strong> Bring small gifts when visiting someone''s home</li>
                <li><strong>Compliments:</strong> Arabs are generous with compliments about food, children, and homes</li>
                <li><strong>Time:</strong> Being late is often acceptable in social situations</li>
            </ul>
            
            <h4>Religious Considerations:</h4>
            <ul>
                <li><strong>Prayer Times:</strong> Be respectful during the five daily prayer times</li>
                <li><strong>Ramadan:</strong> Avoid eating or drinking in public during fasting hours</li>
                <li><strong>Dress Code:</strong> Dress modestly, especially in conservative areas</li>
                <li><strong>Religious Expressions:</strong> "Insha''Allah" (God willing) is commonly used</li>
            </ul>',
            '<h3>Cultural Scenario Practice</h3>
            
            <p><strong>Scenario 1: Visiting Someone''s Home</strong></p>
            <p>You''re invited to dinner at an Arabic family''s home. How do you:</p>
            <ul>
                <li>Greet the host and family members?</li>
                <li>Respond to offers of food and drink?</li>
                <li>Express appreciation for the meal?</li>
                <li>Take your leave appropriately?</li>
            </ul>
            
            <h4>Practice Situations:</h4>
            <ol>
                <li>Role-play accepting tea at a business meeting</li>
                <li>Practice complimenting someone''s home in Arabic</li>
                <li>Learn appropriate responses to "Insha''Allah"</li>
            </ol>
            
            <h4>Cultural Awareness Quiz:</h4>
            <p>Test your understanding of Arabic cultural norms:</p>
            <ul>
                <li>Is it appropriate to refuse a second cup of tea?</li>
                <li>Should you remove your shoes when entering a home?</li>
                <li>How do you show respect during prayer time?</li>
            </ul>',
            ARRAY['Understand Arabic cultural norms', 'Learn appropriate social behavior', 'Practice respectful interactions']
        ) RETURNING id INTO lesson7_id;

        -- Lesson 8: Business and Professional Arabic
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module4_id,
            'Business and Professional Arabic',
            'Learn formal Arabic expressions and professional communication skills.',
            'video',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            25,
            false,
            2,
            '<h3>Professional Arabic Communication</h3>
            <p>Business Arabic requires a more formal tone and specific vocabulary for professional settings.</p>
            
            <h4>Formal Greetings:</h4>
            <ul>
                <li><strong>السلام عليكم ورحمة الله وبركاته (As-salamu alaykum wa rahmatullahi wa barakatuh)</strong> - Peace, mercy, and blessings be upon you</li>
                <li><strong>أهلاً وسهلاً بك (Ahlan wa sahlan bika)</strong> - Welcome (formal)</li>
                <li><strong>تشرفنا (Tasharrafna)</strong> - We are honored (when meeting someone important)</li>
            </ul>
            
            <h4>Business Phrases:</h4>
            <ul>
                <li><strong>أتشرف بلقائك (Atasharraf bi-liqa''ik)</strong> - I''m honored to meet you</li>
                <li><strong>ما هي خدماتكم؟ (Ma hiya khidmatukum?)</strong> - What are your services?</li>
                <li><strong>نود التعاون معكم (Nurid at-ta''awun ma''akum)</strong> - We would like to cooperate with you</li>
                <li><strong>هل يمكننا ترتيب اجتماع؟ (Hal yumkinuna tartib ijtimaa?)</strong> - Can we arrange a meeting?</li>
            </ul>
            
            <h4>Professional Titles:</h4>
            <ul>
                <li><strong>سعادة (Sa''ada)</strong> - Your Excellency (for high-ranking officials)</li>
                <li><strong>معالي (Ma''ali)</strong> - Your Honor (for ministers, ambassadors)</li>
                <li><strong>دكتور (Duktor)</strong> - Doctor</li>
                <li><strong>مهندس (Muhandis)</strong> - Engineer</li>
                <li><strong>مدير (Mudeer)</strong> - Manager/Director</li>
            </ul>',
            '<h3>Business Meeting Simulation</h3>
            
            <p><strong>Scenario: First Business Meeting</strong></p>
            <p>You''re meeting a potential business partner for the first time. Practice the following:</p>
            
            <ol>
                <li>Formal greeting and introduction</li>
                <li>Exchanging business cards</li>
                <li>Discussing your company''s services</li>
                <li>Expressing interest in cooperation</li>
                <li>Setting up a follow-up meeting</li>
            </ol>
            
            <h4>Professional Email Phrases:</h4>
            <ul>
                <li><strong>تحية طيبة (Tahiyya tayyiba)</strong> - Warm greetings</li>
                <li><strong>نشكركم على وقتكم (Nashkurukum ala waqtikum)</strong> - Thank you for your time</li>
                <li><strong>نتطلع إلى ردكم (Natalab ila raddikum)</strong> - We look forward to your response</li>
            </ul>
            
            <h4>Practice Exercises:</h4>
            <ol>
                <li>Role-play a business introduction</li>
                <li>Practice making appointments in Arabic</li>
                <li>Learn to write formal business emails</li>
            </ol>',
            ARRAY['Master formal Arabic expressions', 'Learn business vocabulary', 'Practice professional communication']
        ) RETURNING id INTO lesson8_id;

        -- Insert sample resources for lessons
        INSERT INTO lesson_resources (lesson_id, title, description, type, url, is_downloadable, order_index)
        VALUES 
        (lesson1_id, 'Arabic Greetings Cheat Sheet', 'Quick reference guide for Arabic greetings', 'pdf', 'https://example.com/arabic-greetings.pdf', true, 1),
        (lesson1_id, 'Cultural Greeting Etiquette', 'Video explaining cultural aspects of Arabic greetings', 'video', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', false, 2),
        (lesson2_id, 'Self-Introduction Template', 'Template for introducing yourself in Arabic', 'pdf', 'https://example.com/introduction-template.pdf', true, 1),
        (lesson3_id, 'Shopping Vocabulary List', 'Complete list of shopping-related Arabic vocabulary', 'pdf', 'https://example.com/shopping-vocab.pdf', true, 1),
        (lesson3_id, 'Arabic Numbers Guide', 'Learn Arabic numbers 1-100', 'pdf', 'https://example.com/arabic-numbers.pdf', true, 2),
        (lesson4_id, 'Direction Phrases Sheet', 'Essential phrases for asking directions', 'pdf', 'https://example.com/directions.pdf', true, 1),
        (lesson5_id, 'Family Tree Worksheet', 'Interactive worksheet to practice family vocabulary', 'pdf', 'https://example.com/family-tree.pdf', true, 1),
        (lesson6_id, 'Descriptive Adjectives List', 'Comprehensive list of Arabic adjectives', 'pdf', 'https://example.com/adjectives.pdf', true, 1),
        (lesson7_id, 'Cultural Etiquette Guide', 'Complete guide to Arabic cultural norms', 'pdf', 'https://example.com/etiquette-guide.pdf', true, 1),
        (lesson8_id, 'Business Arabic Phrases', 'Professional Arabic expressions and phrases', 'pdf', 'https://example.com/business-arabic.pdf', true, 1);

        -- Insert sample exercises for lessons
        INSERT INTO lesson_exercises (lesson_id, title, description, type, content, correct_answer, explanation, points, order_index)
        VALUES 
        (lesson1_id, 'Greeting Matching Exercise', 'Match Arabic greetings with their English translations', 'matching', 
         '{"pairs": [{"arabic": "السلام عليكم", "english": "Peace be upon you"}, {"arabic": "أهلاً وسهلاً", "english": "Welcome"}, {"arabic": "صباح الخير", "english": "Good morning"}]}',
         '{"matches": [{"arabic": "السلام عليكم", "english": "Peace be upon you"}, {"arabic": "أهلاً وسهلاً", "english": "Welcome"}, {"arabic": "صباح الخير", "english": "Good morning"}]}',
         'These are the most common Arabic greetings used in daily conversation.', 10, 1),
        
        (lesson2_id, 'Self-Introduction Fill-in-the-Blank', 'Complete the self-introduction with appropriate words', 'fill_blank',
         '{"text": "السلام عليكم، اسمي [blank1]، أنا من [blank2]، وأعمل [blank3].", "blanks": ["blank1", "blank2", "blank3"]}',
         '{"answers": {"blank1": "أحمد", "blank2": "مصر", "blank3": "مهندس"}}',
         'Practice using your own name, country, and occupation in the blanks.', 15, 1),
        
        (lesson3_id, 'Shopping Dialogue Multiple Choice', 'Choose the correct response in shopping scenarios', 'multiple_choice',
         '{"question": "Shopkeeper: أهلاً وسهلاً! كيف يمكنني مساعدتك؟\nCustomer: أريد أن أشتري تفاح. كم ثمن الكيلو؟\nShopkeeper: عشرة ريالات.\nCustomer: [What should the customer say next?]", "options": ["أريد كيلو واحد", "هذا رخيص", "أين التفاح؟", "شكراً لك"]}',
         '{"correct": 0}',
         'The customer wants to buy one kilo of apples, so they should say "أريد كيلو واحد" (I want one kilo).', 10, 1);

        -- Update course duration (sum of all lesson durations)
        UPDATE courses 
        SET duration_minutes = 175 
        WHERE id = arabic_course_id;

        RAISE NOTICE 'Successfully created sample content for Spoken Arabic for Beginners course';
    ELSE
        RAISE NOTICE 'Course "Spoken Arabic for Beginners" not found';
    END IF;
END $$;

-- ============================================
-- SAMPLE CONTENT FOR "COMPLETE QURAN RECITATION COURSE"
-- ============================================

DO $$
DECLARE
    quran_course_id UUID;
    module1_id UUID;
    module2_id UUID;
    module3_id UUID;
    lesson1_id UUID;
    lesson2_id UUID;
    lesson3_id UUID;
    lesson4_id UUID;
    lesson5_id UUID;
    lesson6_id UUID;
BEGIN
    -- Get the course ID
    SELECT id INTO quran_course_id FROM courses WHERE slug = 'complete-quran-recitation-course';
    
    IF quran_course_id IS NOT NULL THEN
        -- Module 1: Basics of Quran Recitation
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            quran_course_id,
            'Basics of Quran Recitation',
            'Learn the fundamental principles of Quran recitation including proper pronunciation and basic Tajweed rules.',
            1
        ) RETURNING id INTO module1_id;

        -- Module 2: Tajweed Rules
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            quran_course_id,
            'Tajweed Rules',
            'Master the rules of Tajweed for beautiful and correct Quran recitation.',
            2
        ) RETURNING id INTO module2_id;

        -- Module 3: Advanced Recitation
        INSERT INTO course_modules (course_id, title, description, order_index)
        VALUES (
            quran_course_id,
            'Advanced Recitation',
            'Learn advanced techniques and practice reciting longer passages with proper Tajweed.',
            3
        ) RETURNING id INTO module3_id;

        -- Lesson 1: Arabic Alphabet and Pronunciation
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module1_id,
            'Arabic Alphabet and Pronunciation',
            'Learn the Arabic alphabet and correct pronunciation of each letter.',
            'video',
            'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            30,
            true,
            1,
            '<h3>Arabic Alphabet Basics</h3>
            <p>The Arabic alphabet consists of 28 letters, each with its own unique sound. Proper pronunciation is essential for Quran recitation.</p>
            
            <h4>Basic Arabic Letters:</h4>
            <ul>
                <li><strong>أ (Alif)</strong> - A sound, like in "apple"</li>
                <li><strong>ب (Ba)</strong> - B sound, like in "book"</li>
                <li><strong>ت (Ta)</strong> - T sound, like in "table"</li>
                <li><strong>ث (Tha)</strong> - Th sound, like in "think"</li>
                <li><strong>ج (Jeem)</strong> - J sound, like in "jump"</li>
                <li><strong>ح (Ha)</strong> - H sound from throat</li>
                <li><strong>خ (Kha)</strong> - Kh sound, like "loch"</li>
                <li><strong>د (Dal)</strong> - D sound, like in "door"</li>
            </ul>
            
            <h4>Pronunciation Tips:</h4>
            <ul>
                <li>Practice each letter individually</li>
                <li>Pay attention to letters that come from the throat</li>
                <li>Learn the different forms of each letter (initial, medial, final, isolated)</li>
                <li>Practice with a qualified teacher for correct pronunciation</li>
            </ul>',
            '<h3>Alphabet Practice Exercises</h3>
            
            <h4>Exercise 1: Letter Recognition</h4>
            <p>Practice recognizing and pronouncing each letter:</p>
            <ol>
                <li>أ - Alif (A sound)</li>
                <li>ب - Ba (B sound)</li>
                <li>ت - Ta (T sound)</li>
                <li>ث - Tha (Th sound)</li>
            </ol>
            
            <h4>Exercise 2: Letter Forms</h4>
            <p>Learn the different forms of each letter:</p>
            <ul>
                <li><strong>Isolated:</strong> ب</li>
                <li><strong>Initial:</strong> بـ</li>
                <li><strong>Medial:</strong> ـبـ</li>
                <li><strong>Final:</strong> ـب</li>
            </ul>
            
            <h4>Practice Words:</h4>
            <ul>
                <li><strong>كتاب (Kitab)</strong> - Book</li>
                <li><strong>بيت (Bayt)</strong> - House</li>
                <li><strong>أب (Ab)</strong> - Father</li>
                <li><strong>أم (Umm)</strong> - Mother</li>
            </ul>',
            ARRAY['Master Arabic alphabet pronunciation', 'Learn letter forms and positions', 'Practice basic Arabic words']
        ) RETURNING id INTO lesson1_id;

        -- Lesson 2: Basic Tajweed Rules
        INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
        VALUES (
            module1_id,
            'Basic Tajweed Rules',
            'Introduction to Tajweed rules for proper Quran recitation.',
            'video',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            25,
            false,
            2,
            '<h3>Introduction to Tajweed</h3>
            <p>Tajweed is the set of rules for the correct pronunciation of the Quran. It ensures that each letter is pronounced from its proper articulation point.</p>
            
            <h4>Basic Tajweed Principles:</h4>
            <ul>
                <li><strong>Makharij al-Huruf:</strong> The articulation points of letters</li>
                <li><strong>Sifaat al-Huruf:</strong> The characteristics of letters</li>
                <li><strong>Ahkam al-Noon al-Saakinah:</strong> Rules for noon with sukoon</li>
                <li><strong>Ahkam al-Meem al-Saakinah:</strong> Rules for meem with sukoon</li>
            </ul>
            
            <h4>Articulation Points (Makharij):</h4>
            <ul>
                <li><strong>Al-Jawf:</strong> The empty space in the mouth and throat</li>
                <li><strong>Al-Halq:</strong> The throat (أ، ه، ع، غ، خ، ح)</li>
                <li><strong>Al-Lisan:</strong> The tongue (most letters)</li>
                <li><strong>Ash-Shafatayn:</strong> The lips (ب، م، و، ف)</li>
                <li><strong>Al-Khayshum:</strong> The nasal passage (ن، م)</li>
            </ul>',
            '<h3>Tajweed Practice Exercises</h3>
            
            <h4>Exercise 1: Articulation Points</h4>
            <p>Practice pronouncing letters from their correct articulation points:</p>
            <ol>
                <li>Throat letters: أ، ه، ع، غ، خ، ح</li>
                <li>Tongue letters: ت، د، ط، ض، س، ز، ص، ث، ذ، ظ، ل، ن، ر</li>
                <li>Lip letters: ب، م، و، ف</li>
            </ol>
            
            <h4>Exercise 2: Noon Saakinah Rules</h4>
            <p>Practice the rules of noon saakinah:</p>
            <ul>
                <li><strong>Izhaar:</strong> Clear pronunciation (with letters: أ، ه، ع، غ، خ، ح)</li>
                <li><strong>Idghaam:</strong> Merging (with letters: ي، ر، م، ل، و، ن)</li>
                <li><strong>Iqlaab:</strong> Conversion (with letter: ب)</li>
                <li><strong>Ikhfaa:</strong> Hiding (with remaining letters)</li>
            </ul>
            
            <h4>Practice Verses:</h4>
            <p>Practice reciting these verses with proper Tajweed:</p>
            <ul>
                <li>بسم الله الرحمن الرحيم</li>
                <li>الحمد لله رب العالمين</li>
                <li>الرحمن الرحيم</li>
            </ul>',
            ARRAY['Understand Tajweed principles', 'Learn articulation points', 'Practice basic Tajweed rules']
        ) RETURNING id INTO lesson2_id;

        -- Continue with more lessons for Quran course...
        -- (Additional lessons would be added here following the same pattern)

        -- Update course duration
        UPDATE courses 
        SET duration_minutes = 55 
        WHERE id = quran_course_id;

        RAISE NOTICE 'Successfully created sample content for Complete Quran Recitation Course';
    ELSE
        RAISE NOTICE 'Course "Complete Quran Recitation Course" not found';
    END IF;
END $$;
