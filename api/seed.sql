-- Bridge Mock Database Seeding Script
-- Execute this in your Supabase SQL Editor to load default starting data

-- Clear existing data (to avoid duplication if re-run)
TRUNCATE TABLE logs CASCADE;
TRUNCATE TABLE flags CASCADE;
TRUNCATE TABLE news CASCADE;
TRUNCATE TABLE project_messages CASCADE;
TRUNCATE TABLE project_slides CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE messages CASCADE;
TRUNCATE TABLE connections CASCADE;
TRUNCATE TABLE students CASCADE;
TRUNCATE TABLE coordinators CASCADE;
TRUNCATE TABLE schools CASCADE;

-- 1. Insert Schools
INSERT INTO schools (id, name, city, country, logo_url, description, photo_url, created_at) VALUES
('school_1', 'Leicester High School', 'Leicester', 'United Kingdom', '/assets/leicester_logo.jpg', 'Leicester High School is an independent girls'' school located in Leicester, UK. Established in 1906, we provide a warm, nurturing environment that fosters academic excellence, confidence, and international cooperation. Our students are encouraged to be independent thinkers and global citizens.', '/assets/leicester_campus.jpg', NOW()),
('school_2', 'Goethe-Gymnasium', 'Munich', 'Germany', '/assets/goethe_logo.png', 'Goethe-Gymnasium is a mixed, state-supported academic high school (Gymnasium) located in Munich, Germany. We focus on modern languages, science, and international cultural exchanges. We are proud to partner with schools globally to foster bilingual learning and friendships.', '/assets/goethe_campus.png', NOW()),
('school_3', 'Lycée Saint-Exupéry', 'Lyon', 'France', '', 'Lycée Saint-Exupéry is a historic high school in Lyon, France. We specialize in international studies, literature, and art history.', '', NOW());

-- 2. Insert Coordinators (Teachers)
INSERT INTO coordinators (id, school_id, name, email, password_hash, role, approved, created_at) VALUES
('coord_1', 'school_1', 'Mrs. Smith', 'smith@leicesterhigh.edu', '15377d24b9cf70faf35025f65a722f93:bfc80d63b4e7992f17cb4dc9b8cc432d73b36c5d03e8f61830be5f456fc933c8ca97f306a09a74508c7e2acc637482340e17a9cb511541f05603dcad8277cec6', 'Coordinator', TRUE, NOW()),
('coord_2', 'school_2', 'Herr Wagner', 'wagner@goethe.edu', 'f4079a08ef4477824b55e081e449a870:06997dcf3ebe6b06c1f76fe142042ded361145b4d48abd473effde69035c58e54f9050156eb7df715d9da59d5ab510dc4913cccd9670ea2982307aaafcd4f549', 'Coordinator', TRUE, NOW()),
('coord_3', 'school_3', 'M. Dupont', 'dupont@lycee.edu', '1184ad27481cd4ef81dc6d1dd257e7b6:fc1e54976db6a0819c5f5f3f7f934fb2cc58f0a32a74192a9a9cc56756a5fefd406bd9201a7aa82bfdab1027d22bd21cefdcdd9bf221906da1725254c13f9841', 'Coordinator', TRUE, NOW()),
('coord_admin', 'school_1', 'System Admin', 'john@25thirty.com', 'e9aa5e486ab5196919f22c89f7c3211d:d3b1d80b42c24cbcd7feec8c1e91a49fd5b3874f79fd5854c4118c595a3e44418d0e4ae70de8301a3b2ec5f1546bda0282b6cda795e57fb5dce1caab6950f849', 'Admin', TRUE, NOW());

-- 3. Insert Students
INSERT INTO students (id, school_id, name, email, password_hash, year_group, gender, interests, bio, active, created_at) VALUES
('stud_1', 'school_1', 'Harriet Potter', 'harriet@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 9', 'Female', ARRAY['drawing', 'tennis', 'languages'], 'Hi! I am Harriet. I love drawing, playing tennis, and learning languages. I live in Leicester with my family.', TRUE, NOW()),
('stud_2', 'school_1', 'Emily Watson', 'emily@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 8', 'Female', ARRAY['baking', 'reading'], 'I love baking chocolate chip cookies and reading mystery novels.', TRUE, NOW()),
('stud_3', 'school_1', 'Jessica Smith', 'jessica@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 9', 'Female', ARRAY[]::VARCHAR[], '', TRUE, NOW()),
('stud_4', 'school_1', 'Chloe Jones', 'chloe@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 8', 'Female', ARRAY[]::VARCHAR[], '', TRUE, NOW()),
('stud_5', 'school_1', 'Tabitha Brown', 'tabitha@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 9', 'Female', ARRAY[]::VARCHAR[], '', FALSE, NOW()),
('stud_6', 'school_1', 'Sophia Taylor', 'sophia@leicesterhigh.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Year 10', 'Female', ARRAY[]::VARCHAR[], '', FALSE, NOW()),
('stud_7', 'school_2', 'Lukas Schmidt', 'lukas@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 9', 'Male', ARRAY['football', 'minecraft'], 'Hallo! Ich bin Lukas. Ich spiele gerne Fußball und zocke Minecraft. Ich freue mich auf den Austausch!', TRUE, NOW()),
('stud_8', 'school_2', 'Hanna Müller', 'hanna@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 8', 'Female', ARRAY[]::VARCHAR[], '', TRUE, NOW()),
('stud_9', 'school_2', 'Jonas Wagner', 'jonas@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 9', 'Male', ARRAY[]::VARCHAR[], '', TRUE, NOW()),
('stud_10', 'school_2', 'Mia Fischer', 'mia@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 8', 'Female', ARRAY[]::VARCHAR[], '', TRUE, NOW()),
('stud_11', 'school_2', 'Sophie Weber', 'sophie@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 8', 'Female', ARRAY[]::VARCHAR[], '', FALSE, NOW()),
('stud_12', 'school_2', 'Leon Becker', 'leon@goethe.edu', '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', 'Klasse 10', 'Male', ARRAY[]::VARCHAR[], '', FALSE, NOW());

-- 4. Insert Connections (Matches)
INSERT INTO connections (id, student_a_id, student_b_id, status, created_at) VALUES
('match_1', 'stud_1', 'stud_7', 'Active', NOW() - INTERVAL '30 days'),
('match_2', 'stud_2', 'stud_8', 'Active', NOW() - INTERVAL '28 days'),
('match_3', 'stud_3', 'stud_9', 'Active', NOW() - INTERVAL '25 days'),
('match_4', 'stud_4', 'stud_10', 'Active', NOW() - INTERVAL '24 days');

-- 5. Insert Chat Messages
INSERT INTO messages (id, connection_id, sender_id, text, translation, flagged, flag_reason, timestamp) VALUES
('msg_1', 'match_1', 'stud_1', 'Hello Lukas! I am Harriet from Leicester. I am excited to be your pen pal. Do you like football?', 'Hallo Lukas! Ich bin Harriet aus Leicester. Ich freue mich, deine Brieffreundin zu sein. Magst du Fußball?', FALSE, NULL, NOW() - INTERVAL '29 days'),
('msg_2', 'match_1', 'stud_7', 'Hallo Harriet! Yes, I love football. I support Bayern Munich. What about you?', 'Hallo Harriet! Ja, ich liebe Fußball. Ich unterstütze Bayern München. Und du?', FALSE, NULL, NOW() - INTERVAL '28 days'),
('msg_3', 'match_1', 'stud_1', 'Nice! I support Leicester City FC. We should chat about the matches. I also enjoy playing video games.', 'Schön! Ich unterstütze Leicester City FC. Wir sollten uns über die Spiele unterhalten. Ich spiele auch gerne Videospiele.', FALSE, NULL, NOW() - INTERVAL '27 days'),
('msg_4', 'match_1', 'stud_7', 'I play Minecraft and FIFA. Do you have a favorite school subject?', 'Ich play Minecraft und FIFA. Hast du ein Lieblingsfach in der Schule?', FALSE, NULL, NOW() - INTERVAL '26 days'),
('msg_5', 'match_2', 'stud_2', 'Hi Hanna! How is the weather in Munich? Here in Leicester it is raining again!', 'Hallo Hanna! Wie ist das Wetter in München? Hier in Leicester regnet es schon wieder!', FALSE, NULL, NOW() - INTERVAL '25 days'),
('msg_6', 'match_2', 'stud_8', 'Hallo Emily! Here it is sunny today. We are going to the park. What do you do in your free time?', 'Hallo Emily! Hier ist es heute sonnig. Wir gehen in den Park. Was machst du in deiner Freizeit?', FALSE, NULL, NOW() - INTERVAL '24 days'),
('msg_7', 'match_3', 'stud_3', 'Hey Jonas, what are you doing this weekend?', 'Hey Jonas, was makst du dieses Wochenende?', FALSE, NULL, NOW() - INTERVAL '12 days'),
('msg_8', 'match_3', 'stud_9', 'Hey Jessica, I am staying home. Hey, can you give me your phone number? Let''s meet up in secret sometime!', 'Hey Jessica, ich bleibe zu Hause. Du, kannst du mir deine Handynummer geben? Lass uns mal heimlich treffen!', TRUE, 'Contains sensitive terms: "phone number", "meet up in secret"', NOW() - INTERVAL '11 days'),
('msg_9', 'match_1', 'stud_7', 'Can you send me your email address so we can chat on Skype?', 'Kannst du mir deine E-Mail-Adresse schicken, damit wir über Skype chatten können?', FALSE, NULL, NOW() - INTERVAL '10 days'),
('msg_10', 'match_2', 'stud_2', 'Lass uns morgen heimlich treffen!', 'Let''s meet up in secret tomorrow!', FALSE, NULL, NOW() - INTERVAL '9 days');

-- 6. Insert Collaborative Projects
INSERT INTO projects (id, creator_school_id, target_school_id, status, title, brief, paused, created_at) VALUES
('proj_1', 'school_1', 'school_2', 'Active', 'Our Cultural Traditions', 'Compare and write about the traditional foods and celebrations in our countries. Gather materials, write sections together, and publish for approval.', FALSE, NOW() - INTERVAL '20 days');

-- 7. Insert Project Slides
INSERT INTO project_slides (id, project_id, slide_index, layout, title, content, photo_url, author, editable_by_others, last_updated_at) VALUES
('slide_1', 'proj_1', 0, 'split', 'A Taste of Two Cultures', 'In this project, we explore the rich traditions of afternoon tea in England and traditional Brezeln in Bavaria. We want to find out how our families celebrate and share food together.', '', 'Harriet Potter', TRUE, NOW() - INTERVAL '19 days'),
('slide_2', 'proj_1', 1, 'split', 'English Afternoon Tea', 'Afternoon tea is a light meal typically eaten between 4 PM and 6 PM. It consists of tea served with milk, sandwich fingers (like cucumber), and warm scones with clotted cream and strawberry jam.', '/assets/afternoon_tea.png', 'Emily Watson', TRUE, NOW() - INTERVAL '18 days'),
('slide_3', 'proj_1', 2, 'split', 'Bavarian Soft Pretzels', 'Brezeln are a traditional type of baked bread product shaped into a knot. They are dipped in lye before baking to get their dark brown, glossy skin and coarse salt is sprinkled on top.', '/assets/brezeln.png', 'Lukas Schmidt', TRUE, NOW() - INTERVAL '17 days');

-- 8. Insert School News
INSERT INTO news (id, title, content, posted_by, school_id, timestamp) VALUES
('news_1', 'Welcome to the 2026 Exchange!', 'We are thrilled to launch this exchange program between Leicester High School and Goethe-Gymnasium. Please remember to respect your pen pal and follow the safety guidelines. Have fun learning new languages and sharing traditions!', 'Teacher Mrs. Smith', 'school_1', NOW() - INTERVAL '30 days'),
('news_2', 'Summer Cultural Festival Coming Up!', 'Next month, we will celebrate our annual Cultural Sharing Week. Get ready to write articles about your local festivals and share them with the partner school!', 'Teacher Herr Wagner', 'school_2', NOW() - INTERVAL '15 days');

-- 9. Insert Safeguarding Flags
INSERT INTO flags (id, message_id, project_id, status, flagged_at, reason, details, reported_by, reviewed_by, reviewed_at, action_taken) VALUES
('flag_1', 'msg_8', NULL, 'Pending', NOW() - INTERVAL '11 days', 'Flagged automatically for sensitive content.', 'Message contains key phrases: "phone number", "secret"', 'System', NULL, NULL, NULL),
('flag_2', 'msg_9', NULL, 'Resolved', NOW() - INTERVAL '10 days', 'Request for external communication details.', 'Message contains external application trigger: "Skype"', 'System', 'Teacher Mrs. Smith', NOW() - INTERVAL '10 days' + INTERVAL '4 hours', 'Dismissed'),
('flag_3', 'msg_10', NULL, 'Resolved', NOW() - INTERVAL '9 days', 'Keyword match: "heimlich treffen"', 'Message contains flagging vocabulary.', 'System', 'Teacher Mrs. Smith', NOW() - INTERVAL '8 days', 'Resumed Conversation');

-- 10. Insert System Audit Logs
INSERT INTO logs (id, type, action, actor, created_at) VALUES
('log_1', 'System Action', 'Match Created: Harriet Potter matched with Lukas Schmidt.', 'Teacher Mrs. Smith', NOW() - INTERVAL '30 days'),
('log_2', 'Safeguarding Action', 'Article Approved: Approved article "Afternoon Tea in England" by Emily Watson.', 'Teacher Mrs. Smith', NOW() - INTERVAL '21 days'),
('log_3', 'Safeguarding Alert', 'Auto Safeguard Flag: Message 8 flagged for sensitive keywords.', 'System', NOW() - INTERVAL '11 days');
