-- ============================================================
-- Migration 020: Cleanup + Reinitialize English Course
-- Run this instead of 019 if you got a duplicate key error
-- ============================================================

-- Step 1: Clean up any partial data from a previous failed run
DELETE FROM mini_games WHERE lesson_id IN (
  'cccccccc-0000-0000-0000-000000000001',
  'cccccccc-0000-0000-0000-000000000002',
  'cccccccc-0000-0000-0000-000000000003',
  'cccccccc-0000-0000-0000-000000000004',
  'cccccccc-0000-0000-0000-000000000005',
  'cccccccc-0000-0000-0000-000000000006',
  'cccccccc-0000-0000-0000-000000000007',
  'cccccccc-0000-0000-0000-000000000008',
  'cccccccc-1111-0000-0000-000000000001',
  'cccccccc-1111-0000-0000-000000000002',
  'cccccccc-1111-0000-0000-000000000003',
  'cccccccc-1111-0000-0000-000000000004',
  'cccccccc-1111-0000-0000-000000000005',
  'cccccccc-1111-0000-0000-000000000006',
  'cccccccc-1111-0000-0000-000000000007',
  'cccccccc-1111-0000-0000-000000000008'
);

DELETE FROM questions WHERE lesson_id IN (
  'cccccccc-0000-0000-0000-000000000001',
  'cccccccc-0000-0000-0000-000000000002',
  'cccccccc-0000-0000-0000-000000000003',
  'cccccccc-0000-0000-0000-000000000004',
  'cccccccc-0000-0000-0000-000000000005',
  'cccccccc-0000-0000-0000-000000000006',
  'cccccccc-0000-0000-0000-000000000007',
  'cccccccc-0000-0000-0000-000000000008',
  'cccccccc-1111-0000-0000-000000000001',
  'cccccccc-1111-0000-0000-000000000002',
  'cccccccc-1111-0000-0000-000000000003',
  'cccccccc-1111-0000-0000-000000000004',
  'cccccccc-1111-0000-0000-000000000005',
  'cccccccc-1111-0000-0000-000000000006',
  'cccccccc-1111-0000-0000-000000000007',
  'cccccccc-1111-0000-0000-000000000008'
);

DELETE FROM lesson_exercises WHERE lesson_id IN (
  'cccccccc-0000-0000-0000-000000000001',
  'cccccccc-0000-0000-0000-000000000002',
  'cccccccc-0000-0000-0000-000000000003',
  'cccccccc-0000-0000-0000-000000000004',
  'cccccccc-0000-0000-0000-000000000005',
  'cccccccc-0000-0000-0000-000000000006',
  'cccccccc-0000-0000-0000-000000000007',
  'cccccccc-0000-0000-0000-000000000008',
  'cccccccc-1111-0000-0000-000000000001',
  'cccccccc-1111-0000-0000-000000000002',
  'cccccccc-1111-0000-0000-000000000003',
  'cccccccc-1111-0000-0000-000000000004',
  'cccccccc-1111-0000-0000-000000000005',
  'cccccccc-1111-0000-0000-000000000006',
  'cccccccc-1111-0000-0000-000000000007',
  'cccccccc-1111-0000-0000-000000000008'
);

DELETE FROM lessons WHERE id IN (
  'cccccccc-0000-0000-0000-000000000001',
  'cccccccc-0000-0000-0000-000000000002',
  'cccccccc-0000-0000-0000-000000000003',
  'cccccccc-0000-0000-0000-000000000004',
  'cccccccc-0000-0000-0000-000000000005',
  'cccccccc-0000-0000-0000-000000000006',
  'cccccccc-0000-0000-0000-000000000007',
  'cccccccc-0000-0000-0000-000000000008',
  'cccccccc-1111-0000-0000-000000000001',
  'cccccccc-1111-0000-0000-000000000002',
  'cccccccc-1111-0000-0000-000000000003',
  'cccccccc-1111-0000-0000-000000000004',
  'cccccccc-1111-0000-0000-000000000005',
  'cccccccc-1111-0000-0000-000000000006',
  'cccccccc-1111-0000-0000-000000000007',
  'cccccccc-1111-0000-0000-000000000008'
);

DELETE FROM topics WHERE id = 'bbbbbbbb-1111-0000-0000-000000000001';

-- Step 2: Re-insert everything cleanly

-- TOPIC
INSERT INTO topics (id, course_id, title_he, title_en, order_index)
VALUES (
  'bbbbbbbb-1111-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'צעדים ראשונים באנגלית',
  'First Steps in English',
  1
);

-- ============================================================
-- LESSON 1: Letter S
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000001',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות S',
  'The Letter S',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#2563EB;line-height:1.1">S s</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/s/</strong> — כמו ב־<strong>שמש</strong> (sun) 🌞</p></div><h2>מילים שמתחילות ב-S ☀️</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">☀️</div><div style="font-weight:700">Sun</div><div style="color:#6B7280;font-size:0.85rem">שמש</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">⭐</div><div style="font-weight:700">Star</div><div style="color:#6B7280;font-size:0.85rem">כוכב</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐍</div><div style="font-weight:700">Snake</div><div style="color:#6B7280;font-size:0.85rem">נחש</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥗</div><div style="font-weight:700">Salad</div><div style="color:#6B7280;font-size:0.85rem">סלט</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥪</div><div style="font-weight:700">Sandwich</div><div style="color:#6B7280;font-size:0.85rem">סנדוויץ</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍝</div><div style="font-weight:700">Spaghetti</div><div style="color:#6B7280;font-size:0.85rem">ספגטי</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🛋️</div><div style="font-weight:700">Sofa</div><div style="color:#6B7280;font-size:0.85rem">ספה</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🧼</div><div style="font-weight:700">Soap</div><div style="color:#6B7280;font-size:0.85rem">סבון</div></div></div><div style="background:#F0FDF4;border:2px solid #86EFAC;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#166534;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Salad</strong> 🥗 ← → <strong>סלט</strong></p><p><strong>Sandwich</strong> 🥪 ← → <strong>סנדוויץ</strong></p><p><strong>Spaghetti</strong> 🍝 ← → <strong>ספגטי</strong> (הגיעו שניהם מאיטלקית!)</p><p><strong>Sofa</strong> 🛋️ ← → <strong>ספה</strong></p><p style="color:#166534;font-size:0.9rem;margin-bottom:0">💡 כשאתם שומעים מילה אנגלית, שימו לב — אולי כבר אתם מכירים אותה!</p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">The <strong>sun</strong> is bright today. ☀️</p><p dir="ltr">I see a <strong>star</strong> in the sky. ⭐</p><p dir="ltr">I eat a <strong>sandwich</strong> for lunch. 🥪</p><p dir="ltr">The <strong>snake</strong> is long and green. 🐍</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#2563EB;line-height:1.1">S s</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/s/</strong> — like in <strong>sun</strong> ☀️</p></div><h2>Words that start with S ☀️</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">☀️</div><div style="font-weight:700">Sun</div><div style="color:#6B7280;font-size:0.85rem">שמש</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">⭐</div><div style="font-weight:700">Star</div><div style="color:#6B7280;font-size:0.85rem">כוכב</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐍</div><div style="font-weight:700">Snake</div><div style="color:#6B7280;font-size:0.85rem">נחש</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥗</div><div style="font-weight:700">Salad</div><div style="color:#6B7280;font-size:0.85rem">סלט</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥪</div><div style="font-weight:700">Sandwich</div><div style="color:#6B7280;font-size:0.85rem">סנדוויץ</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍝</div><div style="font-weight:700">Spaghetti</div><div style="color:#6B7280;font-size:0.85rem">ספגטי</div></div></div>',
  1
);

-- S exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'כיצד כותבים "שמש" באנגלית?', 'How do you write "שמש" in English?', 'Sun', 'מתחיל ב-S', 'Starts with S', 'Sun = שמש', 'Sun means שמש', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'כתוב את המילה לספגטי באנגלית', 'Write the English word for ספגטי', 'Spaghetti', 'נשמע מאוד דומה לעברית!', 'Sounds very similar to Hebrew!', 'Spaghetti — הגיעה מאיטלקית', 'Spaghetti — came from Italian', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'השלם: The ___ is in the sky (כוכב)', 'Complete: The ___ is in the sky (star)', 'star', 'מתחיל ב-S, 4 אותיות', 'Starts with S, 4 letters', 'Star = כוכב', 'Star = כוכב', 3);

-- S quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'quiz', 'מה זה "Sun"?', 'What does "Sun" mean?', ARRAY['שמש','כוכב','ירח','עב'], ARRAY['Sun','Star','Moon','Cloud'], 0, 'Sun = שמש ☀️', 'Sun = שמש ☀️', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'quiz', 'איזו מילה מתחילה ב-S?', 'Which word starts with S?', ARRAY['Sandwich','Banana','Tiger','Mango'], ARRAY['Sandwich','Banana','Tiger','Mango'], 0, 'Sandwich מתחיל ב-S', 'Sandwich starts with S', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'quiz', 'מה זה "Snake"?', 'What does "Snake" mean?', ARRAY['נחש','דג','ציפור','חתול'], ARRAY['Snake','Fish','Bird','Cat'], 0, 'Snake = נחש 🐍', 'Snake = נחש 🐍', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'quiz', 'איזו מילה אנגלית דומה ל"סלט"?', 'Which English word sounds like "סלט"?', ARRAY['Salad','Soup','Steak','Sauce'], ARRAY['Salad','Soup','Steak','Sauce'], 0, 'Salad נשמע כמו סלט!', 'Salad sounds like סלט!', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'quiz', 'מה זה "Soap"?', 'What does "Soap" mean?', ARRAY['סבון','שמפו','מגבת','מברשת'], ARRAY['Soap','Shampoo','Towel','Brush'], 0, 'Soap = סבון 🧼', 'Soap = סבון 🧼', 5);

-- S mini-game: memory
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000001', 'memory', '🧠 זכרון — הפוך קלפים ומצא זוגות!', '🧠 Memory — flip cards and find pairs!',
  '[{"word":"Sun","emoji":"☀️","translation":"שמש"},{"word":"Star","emoji":"⭐","translation":"כוכב"},{"word":"Snake","emoji":"🐍","translation":"נחש"},{"word":"Salad","emoji":"🥗","translation":"סלט"},{"word":"Sandwich","emoji":"🥪","translation":"סנדוויץ"},{"word":"Soap","emoji":"🧼","translation":"סבון"}]'::jsonb, 1);

-- ============================================================
-- LESSON 2: Letter T
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000002',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות T',
  'The Letter T',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#7C3AED;line-height:1.1">T t</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/t/</strong> — כמו ב־<strong>טלפון</strong> (telephone) 📞</p></div><h2>מילים שמתחילות ב-T 🐯</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐯</div><div style="font-weight:700">Tiger</div><div style="color:#6B7280;font-size:0.85rem">נמר</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍅</div><div style="font-weight:700">Tomato</div><div style="color:#6B7280;font-size:0.85rem">עגבנייה</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📞</div><div style="font-weight:700">Telephone</div><div style="color:#6B7280;font-size:0.85rem">טלפון</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📺</div><div style="font-weight:700">Television</div><div style="color:#6B7280;font-size:0.85rem">טלוויזיה</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🚕</div><div style="font-weight:700">Taxi</div><div style="color:#6B7280;font-size:0.85rem">מונית</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🎾</div><div style="font-weight:700">Tennis</div><div style="color:#6B7280;font-size:0.85rem">טניס</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐢</div><div style="font-weight:700">Turtle</div><div style="color:#6B7280;font-size:0.85rem">צב</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🌳</div><div style="font-weight:700">Tree</div><div style="color:#6B7280;font-size:0.85rem">עץ</div></div></div><div style="background:#FFF7ED;border:2px solid #FED7AA;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#9A3412;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Telephone</strong> 📞 ← → <strong>טלפון</strong></p><p><strong>Television</strong> 📺 ← → <strong>טלוויזיה</strong></p><p><strong>Taxi</strong> 🚕 ← → <strong>טקסי</strong></p><p><strong>Tennis</strong> 🎾 ← → <strong>טניס</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">The <strong>tiger</strong> is orange and black. 🐯</p><p dir="ltr">I call you on the <strong>telephone</strong>. 📞</p><p dir="ltr">The <strong>turtle</strong> walks slowly. 🐢</p><p dir="ltr">We play <strong>tennis</strong> together. 🎾</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#7C3AED;line-height:1.1">T t</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/t/</strong> — like in <strong>telephone</strong> 📞</p></div><h2>Words that start with T 🐯</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐯</div><div style="font-weight:700">Tiger</div><div style="color:#6B7280;font-size:0.85rem">נמר</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📞</div><div style="font-weight:700">Telephone</div><div style="color:#6B7280;font-size:0.85rem">טלפון</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📺</div><div style="font-weight:700">Television</div><div style="color:#6B7280;font-size:0.85rem">טלוויזיה</div></div><div style="background:#F5F3FF;border:2px solid #DDD6FE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🎾</div><div style="font-weight:700">Tennis</div><div style="color:#6B7280;font-size:0.85rem">טניס</div></div></div>',
  2
);

-- T exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'כיצד אומרים "טלפון" באנגלית?', 'How do you say "טלפון" in English?', 'Telephone', 'נשמע דומה מאוד!', 'Sounds very similar!', 'Telephone = טלפון 📞', 'Telephone = טלפון 📞', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'כיצד כותבים "נמר" באנגלית?', 'How do you write "נמר" in English?', 'Tiger', 'מתחיל ב-T', 'Starts with T', 'Tiger = נמר 🐯', 'Tiger = נמר 🐯', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'השלם: The ___ walks slowly (צב)', 'Complete: The ___ walks slowly (turtle)', 'turtle', 'מתחיל ב-T, 6 אותיות', 'Starts with T, 6 letters', 'Turtle = צב 🐢', 'Turtle = צב 🐢', 3);

-- T quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'quiz', 'מה זה "Tiger"?', 'What does "Tiger" mean?', ARRAY['נמר','אריה','פיל','קוף'], ARRAY['Tiger','Lion','Elephant','Monkey'], 0, 'Tiger = נמר 🐯', 'Tiger = נמר 🐯', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'quiz', 'איזו מילה דומה ל"טלוויזיה"?', 'Which word sounds like "טלוויזיה"?', ARRAY['Television','Telephone','Taxi','Tennis'], ARRAY['Television','Telephone','Taxi','Tennis'], 0, 'Television = טלוויזיה 📺', 'Television = טלוויזיה 📺', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'quiz', 'מה זה "Turtle"?', 'What does "Turtle" mean?', ARRAY['צב','נחש','דג','צפרדע'], ARRAY['Turtle','Snake','Fish','Frog'], 0, 'Turtle = צב 🐢', 'Turtle = צב 🐢', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'quiz', 'מה זה "Tree"?', 'What does "Tree" mean?', ARRAY['עץ','פרח','עשב','שיח'], ARRAY['Tree','Flower','Grass','Bush'], 0, 'Tree = עץ 🌳', 'Tree = עץ 🌳', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'quiz', 'מה זה "Taxi"?', 'What does "Taxi" mean?', ARRAY['מונית','אוטובוס','רכבת','משאית'], ARRAY['Taxi','Bus','Train','Truck'], 0, 'Taxi = מונית 🚕', 'Taxi = מונית 🚕', 5);

-- T mini-game: memory
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000002', 'memory', '🧠 זכרון — הפוך קלפים ומצא זוגות!', '🧠 Memory — flip cards and find pairs!',
  '[{"word":"Tiger","emoji":"🐯","translation":"נמר"},{"word":"Telephone","emoji":"📞","translation":"טלפון"},{"word":"Television","emoji":"📺","translation":"טלוויזיה"},{"word":"Taxi","emoji":"🚕","translation":"מונית"},{"word":"Tennis","emoji":"🎾","translation":"טניס"},{"word":"Turtle","emoji":"🐢","translation":"צב"}]'::jsonb, 1);

-- ============================================================
-- LESSON 3: Letter P
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000003',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות P',
  'The Letter P',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#DC2626;line-height:1.1">P p</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/p/</strong> — כמו ב־<strong>פינגווין</strong> (penguin) 🐧</p></div><h2>מילים שמתחילות ב-P 🐧</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍕</div><div style="font-weight:700">Pizza</div><div style="color:#6B7280;font-size:0.85rem">פיצה</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐧</div><div style="font-weight:700">Penguin</div><div style="color:#6B7280;font-size:0.85rem">פינגווין</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🎹</div><div style="font-weight:700">Piano</div><div style="color:#6B7280;font-size:0.85rem">פסנתר</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🏛️</div><div style="font-weight:700">Pyramid</div><div style="color:#6B7280;font-size:0.85rem">פירמידה</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🦜</div><div style="font-weight:700">Parrot</div><div style="color:#6B7280;font-size:0.85rem">תוכי</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐼</div><div style="font-weight:700">Panda</div><div style="color:#6B7280;font-size:0.85rem">פנדה</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍍</div><div style="font-weight:700">Pineapple</div><div style="color:#6B7280;font-size:0.85rem">אננס</div></div></div><div style="background:#FFF1F2;border:2px solid #FECDD3;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#9F1239;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Pizza</strong> 🍕 ← → <strong>פיצה</strong></p><p><strong>Penguin</strong> 🐧 ← → <strong>פינגווין</strong></p><p><strong>Piano</strong> 🎹 ← → <strong>פיאנו</strong></p><p><strong>Pyramid</strong> 🏛️ ← → <strong>פירמידה</strong></p><p><strong>Panda</strong> 🐼 ← → <strong>פנדה</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">I love eating <strong>pizza</strong>! 🍕</p><p dir="ltr">The <strong>penguin</strong> lives in Antarctica. 🐧</p><p dir="ltr">The <strong>parrot</strong> can talk! 🦜</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#DC2626;line-height:1.1">P p</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/p/</strong> — like in <strong>penguin</strong> 🐧</p></div><h2>Words that start with P 🐧</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍕</div><div style="font-weight:700">Pizza</div><div style="color:#6B7280;font-size:0.85rem">פיצה</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐧</div><div style="font-weight:700">Penguin</div><div style="color:#6B7280;font-size:0.85rem">פינגווין</div></div><div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐼</div><div style="font-weight:700">Panda</div><div style="color:#6B7280;font-size:0.85rem">פנדה</div></div></div>',
  3
);

-- P exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'כיצד אומרים "פינגווין" באנגלית?', 'How do you say "פינגווין" in English?', 'Penguin', 'נשמע מאוד דומה!', 'Sounds very similar!', 'Penguin = פינגווין 🐧', 'Penguin = פינגווין 🐧', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'כיצד כותבים "תוכי" באנגלית?', 'How do you write "תוכי" in English?', 'Parrot', 'מתחיל ב-P, 6 אותיות', 'Starts with P, 6 letters', 'Parrot = תוכי 🦜', 'Parrot = תוכי 🦜', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'השלם: I love eating ___ (פיצה)', 'Complete: I love eating ___ (pizza)', 'pizza', 'נשמע כמו פיצה', 'Sounds like pizza', 'Pizza = פיצה 🍕', 'Pizza = פיצה 🍕', 3);

-- P quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'quiz', 'מה זה "Penguin"?', 'What does "Penguin" mean?', ARRAY['פינגווין','פנדה','תוכי','ציפור'], ARRAY['Penguin','Panda','Parrot','Bird'], 0, 'Penguin = פינגווין 🐧', 'Penguin = פינגווין 🐧', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'quiz', 'איזו מילה דומה ל"פירמידה"?', 'Which word sounds like "פירמידה"?', ARRAY['Pyramid','Pizza','Piano','Parrot'], ARRAY['Pyramid','Pizza','Piano','Parrot'], 0, 'Pyramid = פירמידה 🏛️', 'Pyramid = פירמידה 🏛️', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'quiz', 'מה זה "Parrot"?', 'What does "Parrot" mean?', ARRAY['תוכי','יונה','נשר','ינשוף'], ARRAY['Parrot','Dove','Eagle','Owl'], 0, 'Parrot = תוכי 🦜', 'Parrot = תוכי 🦜', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'quiz', 'מה זה "Pineapple"?', 'What does "Pineapple" mean?', ARRAY['אננס','תפוח','אגס','בננה'], ARRAY['Pineapple','Apple','Pear','Banana'], 0, 'Pineapple = אננס 🍍', 'Pineapple = אננס 🍍', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'quiz', 'איזו מילה מתחילה ב-P?', 'Which word starts with P?', ARRAY['Pizza','Banana','Mango','Sun'], ARRAY['Pizza','Banana','Mango','Sun'], 0, 'Pizza מתחיל ב-P 🍕', 'Pizza starts with P 🍕', 5);

-- P mini-game: scramble
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000003', 'scramble', '🔀 סדר מחדש את האותיות!', '🔀 Unscramble the letters!',
  '[{"word":"Pizza","emoji":"🍕","translation":"פיצה"},{"word":"Penguin","emoji":"🐧","translation":"פינגווין"},{"word":"Piano","emoji":"🎹","translation":"פסנתר"},{"word":"Parrot","emoji":"🦜","translation":"תוכי"},{"word":"Panda","emoji":"🐼","translation":"פנדה"},{"word":"Pyramid","emoji":"🏛️","translation":"פירמידה"}]'::jsonb, 1);

-- ============================================================
-- LESSON 4: Letter M
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000004',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות M',
  'The Letter M',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#059669;line-height:1.1">M m</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/m/</strong> — כמו ב־<strong>מנגו</strong> (mango) 🥭</p></div><h2>מילים שמתחילות ב-M 🐒</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐒</div><div style="font-weight:700">Monkey</div><div style="color:#6B7280;font-size:0.85rem">קוף</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥭</div><div style="font-weight:700">Mango</div><div style="color:#6B7280;font-size:0.85rem">מנגו</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🎵</div><div style="font-weight:700">Music</div><div style="color:#6B7280;font-size:0.85rem">מוסיקה</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🏛️</div><div style="font-weight:700">Museum</div><div style="color:#6B7280;font-size:0.85rem">מוזיאון</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🏃</div><div style="font-weight:700">Marathon</div><div style="color:#6B7280;font-size:0.85rem">מרתון</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥛</div><div style="font-weight:700">Milk</div><div style="color:#6B7280;font-size:0.85rem">חלב</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🌙</div><div style="font-weight:700">Moon</div><div style="color:#6B7280;font-size:0.85rem">ירח</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">⛰️</div><div style="font-weight:700">Mountain</div><div style="color:#6B7280;font-size:0.85rem">הר</div></div></div><div style="background:#F0FDF4;border:2px solid #86EFAC;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#166534;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Mango</strong> 🥭 ← → <strong>מנגו</strong></p><p><strong>Music</strong> 🎵 ← → <strong>מוסיקה</strong></p><p><strong>Museum</strong> 🏛️ ← → <strong>מוזיאון</strong></p><p><strong>Marathon</strong> 🏃 ← → <strong>מרתון</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">The <strong>monkey</strong> eats a <strong>mango</strong>. 🐒🥭</p><p dir="ltr">I love <strong>music</strong>! 🎵</p><p dir="ltr">The <strong>moon</strong> is beautiful at night. 🌙</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#059669;line-height:1.1">M m</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/m/</strong> — like in <strong>mango</strong> 🥭</p></div><h2>Words that start with M 🐒</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐒</div><div style="font-weight:700">Monkey</div><div style="color:#6B7280;font-size:0.85rem">קוף</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥭</div><div style="font-weight:700">Mango</div><div style="color:#6B7280;font-size:0.85rem">מנגו</div></div><div style="background:#ECFDF5;border:2px solid #A7F3D0;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🎵</div><div style="font-weight:700">Music</div><div style="color:#6B7280;font-size:0.85rem">מוסיקה</div></div></div>',
  4
);

-- M exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'כיצד אומרים "מנגו" באנגלית?', 'How do you say "מנגו" in English?', 'Mango', 'נשמע בדיוק אותו דבר!', 'Sounds exactly the same!', 'Mango = מנגו 🥭', 'Mango = מנגו 🥭', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'כיצד כותבים "קוף" באנגלית?', 'How do you write "קוף" in English?', 'Monkey', 'מתחיל ב-M', 'Starts with M', 'Monkey = קוף 🐒', 'Monkey = קוף 🐒', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'השלם: The ___ is in the sky at night (ירח)', 'Complete: The ___ is in the sky at night (moon)', 'moon', 'מתחיל ב-M, 4 אותיות', 'Starts with M, 4 letters', 'Moon = ירח 🌙', 'Moon = ירח 🌙', 3);

-- M quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'quiz', 'מה זה "Monkey"?', 'What does "Monkey" mean?', ARRAY['קוף','פיל','ארנב','כלב'], ARRAY['Monkey','Elephant','Rabbit','Dog'], 0, 'Monkey = קוף 🐒', 'Monkey = קוף 🐒', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'quiz', 'מה זה "Music"?', 'What does "Music" mean?', ARRAY['מוסיקה','סרט','ספר','משחק'], ARRAY['Music','Movie','Book','Game'], 0, 'Music = מוסיקה 🎵', 'Music = מוסיקה 🎵', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'quiz', 'מה זה "Milk"?', 'What does "Milk" mean?', ARRAY['חלב','מים','מיץ','קפה'], ARRAY['Milk','Water','Juice','Coffee'], 0, 'Milk = חלב 🥛', 'Milk = חלב 🥛', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'quiz', 'מה זה "Mountain"?', 'What does "Mountain" mean?', ARRAY['הר','ים','מדבר','יער'], ARRAY['Mountain','Sea','Desert','Forest'], 0, 'Mountain = הר ⛰️', 'Mountain = הר ⛰️', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'quiz', 'איזו מילה דומה ל"מוזיאון"?', 'Which word sounds like "מוזיאון"?', ARRAY['Museum','Music','Milk','Marathon'], ARRAY['Museum','Music','Milk','Marathon'], 0, 'Museum = מוזיאון 🏛️', 'Museum = מוזיאון 🏛️', 5);

-- M mini-game: scramble
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000004', 'scramble', '🔀 סדר מחדש את האותיות!', '🔀 Unscramble the letters!',
  '[{"word":"Monkey","emoji":"🐒","translation":"קוף"},{"word":"Mango","emoji":"🥭","translation":"מנגו"},{"word":"Music","emoji":"🎵","translation":"מוסיקה"},{"word":"Moon","emoji":"🌙","translation":"ירח"},{"word":"Milk","emoji":"🥛","translation":"חלב"},{"word":"Museum","emoji":"🏛️","translation":"מוזיאון"}]'::jsonb, 1);

-- ============================================================
-- LESSON 5: Letter I
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000005',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות I',
  'The Letter I',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#D97706;line-height:1.1">I i</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/i/</strong> — כמו ב<strong>אינטרנט</strong> (internet) 💻</p></div><h2>מילים שמתחילות ב-I 🍦</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍦</div><div style="font-weight:700">Ice cream</div><div style="color:#6B7280;font-size:0.85rem">גלידה</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🏔️</div><div style="font-weight:700">Igloo</div><div style="color:#6B7280;font-size:0.85rem">איגלו</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🏝️</div><div style="font-weight:700">Island</div><div style="color:#6B7280;font-size:0.85rem">אי</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">💻</div><div style="font-weight:700">Internet</div><div style="color:#6B7280;font-size:0.85rem">אינטרנט</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">👔</div><div style="font-weight:700">Iron</div><div style="color:#6B7280;font-size:0.85rem">מגהץ</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🖊️</div><div style="font-weight:700">Ink</div><div style="color:#6B7280;font-size:0.85rem">דיו</div></div></div><div style="background:#FFFBEB;border:2px solid #F59E0B;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#92400E;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Internet</strong> 💻 ← → <strong>אינטרנט</strong></p><p><strong>Igloo</strong> 🏔️ ← → <strong>איגלו</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">I eat <strong>ice cream</strong> in summer. 🍦</p><p dir="ltr">The <strong>igloo</strong> is made of ice. 🏔️</p><p dir="ltr">I use the <strong>internet</strong> every day. 💻</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#D97706;line-height:1.1">I i</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/i/</strong> — like in <strong>internet</strong> 💻</p></div><h2>Words that start with I 🍦</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍦</div><div style="font-weight:700">Ice cream</div><div style="color:#6B7280;font-size:0.85rem">גלידה</div></div><div style="background:#FFFBEB;border:2px solid #FDE68A;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">💻</div><div style="font-weight:700">Internet</div><div style="color:#6B7280;font-size:0.85rem">אינטרנט</div></div></div>',
  5
);

-- I exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'כיצד אומרים "אינטרנט" באנגלית?', 'How do you say "אינטרנט" in English?', 'Internet', 'נשמע בדיוק אותו דבר!', 'Sounds exactly the same!', 'Internet = אינטרנט 💻', 'Internet = אינטרנט 💻', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'כיצד כותבים "גלידה" באנגלית?', 'How do you write "גלידה" in English?', 'Ice cream', 'שתי מילים, מתחיל ב-I', 'Two words, starts with I', 'Ice cream = גלידה 🍦', 'Ice cream = גלידה 🍦', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'השלם: The ___ is made of ice (איגלו)', 'Complete: The ___ is made of ice (igloo)', 'igloo', 'מתחיל ב-I, 5 אותיות', 'Starts with I, 5 letters', 'Igloo = איגלו 🏔️', 'Igloo = איגלו 🏔️', 3);

-- I quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'quiz', 'מה זה "Ice cream"?', 'What does "Ice cream" mean?', ARRAY['גלידה','עוגה','ממתק','שוקולד'], ARRAY['Ice cream','Cake','Candy','Chocolate'], 0, 'Ice cream = גלידה 🍦', 'Ice cream = גלידה 🍦', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'quiz', 'מה זה "Island"?', 'What does "Island" mean?', ARRAY['אי','ים','נהר','אגם'], ARRAY['Island','Sea','River','Lake'], 0, 'Island = אי 🏝️', 'Island = אי 🏝️', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'quiz', 'מה זה "Ink"?', 'What does "Ink" mean?', ARRAY['דיו','עיפרון','נייר','צבע'], ARRAY['Ink','Pencil','Paper','Paint'], 0, 'Ink = דיו 🖊️', 'Ink = דיו 🖊️', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'quiz', 'איזו מילה דומה ל"אינטרנט"?', 'Which word sounds like "אינטרנט"?', ARRAY['Internet','Igloo','Island','Iron'], ARRAY['Internet','Igloo','Island','Iron'], 0, 'Internet = אינטרנט 💻', 'Internet = אינטרנט 💻', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'quiz', 'The ___ is made of ice. (איגלו)', 'The ___ is made of ice. (igloo)', ARRAY['Igloo','Island','Iron','Ink'], ARRAY['Igloo','Island','Iron','Ink'], 0, 'Igloo = איגלו 🏔️', 'Igloo = איגלו 🏔️', 5);

-- I mini-game: scramble
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000005', 'scramble', '🔀 סדר מחדש את האותיות!', '🔀 Unscramble the letters!',
  '[{"word":"Igloo","emoji":"🏔️","translation":"איגלו"},{"word":"Island","emoji":"🏝️","translation":"אי"},{"word":"Internet","emoji":"💻","translation":"אינטרנט"},{"word":"Iron","emoji":"👔","translation":"מגהץ"},{"word":"Ink","emoji":"🖊️","translation":"דיו"},{"word":"Insect","emoji":"🐜","translation":"חרק"}]'::jsonb, 1);

-- ============================================================
-- LESSON 6: Letter A
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000006',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות A',
  'The Letter A',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#BE185D;line-height:1.1">A a</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/a/</strong> — כמו ב<strong>אסטרונאוט</strong> (astronaut)</p></div><h2>מילים שמתחילות ב-A 🍎</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍎</div><div style="font-weight:700">Apple</div><div style="color:#6B7280;font-size:0.85rem">תפוח</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🧑‍🚀</div><div style="font-weight:700">Astronaut</div><div style="color:#6B7280;font-size:0.85rem">אסטרונאוט</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🚑</div><div style="font-weight:700">Ambulance</div><div style="color:#6B7280;font-size:0.85rem">אמבולנס</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📷</div><div style="font-weight:700">Album</div><div style="color:#6B7280;font-size:0.85rem">אלבום</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐊</div><div style="font-weight:700">Alligator</div><div style="color:#6B7280;font-size:0.85rem">תנין</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐜</div><div style="font-weight:700">Ant</div><div style="color:#6B7280;font-size:0.85rem">נמלה</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥑</div><div style="font-weight:700">Avocado</div><div style="color:#6B7280;font-size:0.85rem">אבוקדו</div></div></div><div style="background:#FDF2F8;border:2px solid #F472B6;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#9D174D;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Astronaut</strong> ← → <strong>אסטרונאוט</strong></p><p><strong>Ambulance</strong> ← → <strong>אמבולנס</strong></p><p><strong>Album</strong> ← → <strong>אלבום</strong></p><p><strong>Avocado</strong> ← → <strong>אבוקדו</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">I eat an <strong>apple</strong> every day. 🍎</p><p dir="ltr">The <strong>astronaut</strong> flies to space.</p><p dir="ltr">The <strong>ant</strong> is very small. 🐜</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#BE185D;line-height:1.1">A a</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/a/</strong> — like in <strong>astronaut</strong></p></div><h2>Words that start with A 🍎</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍎</div><div style="font-weight:700">Apple</div><div style="color:#6B7280;font-size:0.85rem">תפוח</div></div><div style="background:#FDF2F8;border:2px solid #F9A8D4;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🧑‍🚀</div><div style="font-weight:700">Astronaut</div><div style="color:#6B7280;font-size:0.85rem">אסטרונאוט</div></div></div>',
  6
);

-- A exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'כיצד אומרים "אסטרונאוט" באנגלית?', 'How do you say "אסטרונאוט" in English?', 'Astronaut', 'נשמע כמעט אותו דבר!', 'Sounds almost the same!', 'Astronaut = אסטרונאוט', 'Astronaut = אסטרונאוט', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'כיצד כותבים "תפוח" באנגלית?', 'How do you write "תפוח" in English?', 'Apple', 'מתחיל ב-A, 5 אותיות', 'Starts with A, 5 letters', 'Apple = תפוח 🍎', 'Apple = תפוח 🍎', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'השלם: The ___ drives fast (אמבולנס)', 'Complete: The ___ drives fast (ambulance)', 'ambulance', 'נשמע כמו אמבולנס', 'Sounds like ambulance', 'Ambulance = אמבולנס 🚑', 'Ambulance = אמבולנס 🚑', 3);

-- A quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'quiz', 'מה זה "Apple"?', 'What does "Apple" mean?', ARRAY['תפוח','תפוז','בננה','ענב'], ARRAY['Apple','Orange','Banana','Grape'], 0, 'Apple = תפוח 🍎', 'Apple = תפוח 🍎', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'quiz', 'מה זה "Ambulance"?', 'What does "Ambulance" mean?', ARRAY['אמבולנס','מכונית','אוטובוס','משאית'], ARRAY['Ambulance','Car','Bus','Truck'], 0, 'Ambulance = אמבולנס 🚑', 'Ambulance = אמבולנס 🚑', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'quiz', 'מה זה "Ant"?', 'What does "Ant" mean?', ARRAY['נמלה','דבורה','יתוש','פרפר'], ARRAY['Ant','Bee','Mosquito','Butterfly'], 0, 'Ant = נמלה 🐜', 'Ant = נמלה 🐜', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'quiz', 'איזו מילה דומה ל"אלבום"?', 'Which word sounds like "אלבום"?', ARRAY['Album','Apple','Arrow','Ant'], ARRAY['Album','Apple','Arrow','Ant'], 0, 'Album = אלבום 📷', 'Album = אלבום 📷', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'quiz', 'מה זה "Alligator"?', 'What does "Alligator" mean?', ARRAY['תנין','נחש','לטאה','צב'], ARRAY['Alligator','Snake','Lizard','Turtle'], 0, 'Alligator = תנין 🐊', 'Alligator = תנין 🐊', 5);

-- A mini-game: memory
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000006', 'memory', '🧠 זכרון — הפוך קלפים ומצא זוגות!', '🧠 Memory — flip cards and find pairs!',
  '[{"word":"Apple","emoji":"🍎","translation":"תפוח"},{"word":"Astronaut","emoji":"🧑‍🚀","translation":"אסטרונאוט"},{"word":"Ambulance","emoji":"🚑","translation":"אמבולנס"},{"word":"Ant","emoji":"🐜","translation":"נמלה"},{"word":"Alligator","emoji":"🐊","translation":"תנין"},{"word":"Avocado","emoji":"🥑","translation":"אבוקדו"}]'::jsonb, 1);

-- ============================================================
-- LESSON 7: Letter N
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000007',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות N',
  'The Letter N',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#0891B2;line-height:1.1">N n</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/n/</strong> — כמו ב<strong>נודלס</strong> (noodles) 🍜</p></div><h2>מילים שמתחילות ב-N 🌙</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">👃</div><div style="font-weight:700">Nose</div><div style="color:#6B7280;font-size:0.85rem">אף</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🌙</div><div style="font-weight:700">Night</div><div style="color:#6B7280;font-size:0.85rem">לילה</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍜</div><div style="font-weight:700">Noodles</div><div style="color:#6B7280;font-size:0.85rem">אטריות</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥷</div><div style="font-weight:700">Ninja</div><div style="color:#6B7280;font-size:0.85rem">נינג''ה</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">👩‍⚕️</div><div style="font-weight:700">Nurse</div><div style="color:#6B7280;font-size:0.85rem">אחות</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🌿</div><div style="font-weight:700">Nature</div><div style="color:#6B7280;font-size:0.85rem">טבע</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">📓</div><div style="font-weight:700">Notebook</div><div style="color:#6B7280;font-size:0.85rem">מחברת</div></div></div><div style="background:#ECFEFF;border:2px solid #22D3EE;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#0E7490;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Noodles</strong> 🍜 ← → <strong>נודלס</strong></p><p><strong>Ninja</strong> 🥷 ← → <strong>נינגה</strong></p><p><strong>November</strong> ← → <strong>נובמבר</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">I smell with my <strong>nose</strong>. 👃</p><p dir="ltr">At <strong>night</strong>, I see the stars. 🌙</p><p dir="ltr">I write in my <strong>notebook</strong>. 📓</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#0891B2;line-height:1.1">N n</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/n/</strong> — like in <strong>noodles</strong> 🍜</p></div><h2>Words that start with N 🌙</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">👃</div><div style="font-weight:700">Nose</div><div style="color:#6B7280;font-size:0.85rem">אף</div></div><div style="background:#ECFEFF;border:2px solid #A5F3FC;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🍜</div><div style="font-weight:700">Noodles</div><div style="color:#6B7280;font-size:0.85rem">אטריות</div></div></div>',
  7
);

-- N exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'כיצד אומרים "נודלס" באנגלית?', 'How do you say "נודלס" in English?', 'Noodles', 'נשמע בדיוק אותו דבר!', 'Sounds exactly the same!', 'Noodles = נודלס 🍜', 'Noodles = נודלס 🍜', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'כיצד כותבים "לילה" באנגלית?', 'How do you write "לילה" in English?', 'Night', 'מתחיל ב-N, 5 אותיות', 'Starts with N, 5 letters', 'Night = לילה 🌙', 'Night = לילה 🌙', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'השלם: I write in my ___ (מחברת)', 'Complete: I write in my ___ (notebook)', 'notebook', 'note + book', 'note + book', 'Notebook = מחברת 📓', 'Notebook = מחברת 📓', 3);

-- N quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'quiz', 'מה זה "Nose"?', 'What does "Nose" mean?', ARRAY['אף','אוזן','עין','פה'], ARRAY['Nose','Ear','Eye','Mouth'], 0, 'Nose = אף 👃', 'Nose = אף 👃', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'quiz', 'מה זה "Nurse"?', 'What does "Nurse" mean?', ARRAY['אחות','רופא','מורה','שוטר'], ARRAY['Nurse','Doctor','Teacher','Police'], 0, 'Nurse = אחות', 'Nurse = אחות', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'quiz', 'מה זה "Notebook"?', 'What does "Notebook" mean?', ARRAY['מחברת','ספר','עיתון','מכתב'], ARRAY['Notebook','Book','Newspaper','Letter'], 0, 'Notebook = מחברת 📓', 'Notebook = מחברת 📓', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'quiz', 'מה זה "Nature"?', 'What does "Nature" mean?', ARRAY['טבע','עיר','כביש','בניין'], ARRAY['Nature','City','Road','Building'], 0, 'Nature = טבע 🌿', 'Nature = טבע 🌿', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'quiz', 'איזו מילה דומה ל"נודלס"?', 'Which word sounds like "נודלס"?', ARRAY['Noodles','Night','Nose','Nurse'], ARRAY['Noodles','Night','Nose','Nurse'], 0, 'Noodles = נודלס 🍜', 'Noodles = נודלס 🍜', 5);

-- N mini-game: memory
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000007', 'memory', '🧠 זכרון — הפוך קלפים ומצא זוגות!', '🧠 Memory — flip cards and find pairs!',
  '[{"word":"Nose","emoji":"👃","translation":"אף"},{"word":"Night","emoji":"🌙","translation":"לילה"},{"word":"Noodles","emoji":"🍜","translation":"אטריות"},{"word":"Nurse","emoji":"👩‍⚕️","translation":"אחות"},{"word":"Nature","emoji":"🌿","translation":"טבע"},{"word":"Notebook","emoji":"📓","translation":"מחברת"}]'::jsonb, 1);

-- ============================================================
-- LESSON 8: Letter D
-- ============================================================
INSERT INTO lessons (id, topic_id, title_he, title_en, content_he, content_en, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000008',
  'bbbbbbbb-1111-0000-0000-000000000001',
  'האות D',
  'The Letter D',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#1D4ED8;line-height:1.1">D d</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">הצליל: <strong>/d/</strong> — כמו ב<strong>דולפין</strong> (dolphin) 🐬</p></div><h2>מילים שמתחילות ב-D 🐬</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐕</div><div style="font-weight:700">Dog</div><div style="color:#6B7280;font-size:0.85rem">כלב</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐬</div><div style="font-weight:700">Dolphin</div><div style="color:#6B7280;font-size:0.85rem">דולפין</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">💎</div><div style="font-weight:700">Diamond</div><div style="color:#6B7280;font-size:0.85rem">יהלום</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐉</div><div style="font-weight:700">Dragon</div><div style="color:#6B7280;font-size:0.85rem">דרקון</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🦕</div><div style="font-weight:700">Dinosaur</div><div style="color:#6B7280;font-size:0.85rem">דינוסאור</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">👨‍⚕️</div><div style="font-weight:700">Doctor</div><div style="color:#6B7280;font-size:0.85rem">רופא</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🥁</div><div style="font-weight:700">Drum</div><div style="color:#6B7280;font-size:0.85rem">תוף</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🦆</div><div style="font-weight:700">Duck</div><div style="color:#6B7280;font-size:0.85rem">ברווז</div></div></div><div style="background:#EFF6FF;border:2px solid #93C5FD;border-radius:1rem;padding:1.25rem;margin:1.5rem 0"><h3 style="color:#1E3A8A;margin-top:0">🇮🇱↔️🇺🇸 מילים שנשמעות כמעט אותו דבר!</h3><p><strong>Dolphin</strong> ← → <strong>דולפין</strong></p><p><strong>Dragon</strong> ← → <strong>דרקון</strong></p><p><strong>Doctor</strong> ← → <strong>דוקטור</strong></p><p><strong>Dinosaur</strong> ← → <strong>דינוסאור</strong></p></div><h2>📖 משפטים לדוגמה</h2><p dir="ltr">My <strong>dog</strong> is friendly. 🐕</p><p dir="ltr">The <strong>dolphin</strong> swims in the sea. 🐬</p><p dir="ltr">The <strong>dinosaur</strong> lived long ago. 🦕</p>',
  '<div style="text-align:center;margin-bottom:1.5rem"><div style="font-size:6rem;font-weight:900;color:#1D4ED8;line-height:1.1">D d</div><p style="font-size:1.1rem;color:#6B7280;margin-top:0.5rem">Sound: <strong>/d/</strong> — like in <strong>dolphin</strong> 🐬</p></div><h2>Words that start with D 🐬</h2><div style="display:flex;flex-wrap:wrap;gap:1rem;margin:1rem 0"><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐕</div><div style="font-weight:700">Dog</div><div style="color:#6B7280;font-size:0.85rem">כלב</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🐬</div><div style="font-weight:700">Dolphin</div><div style="color:#6B7280;font-size:0.85rem">דולפין</div></div><div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:1rem;padding:1rem;text-align:center;min-width:110px"><div style="font-size:2.5rem">🦕</div><div style="font-weight:700">Dinosaur</div><div style="color:#6B7280;font-size:0.85rem">דינוסאור</div></div></div>',
  8
);

-- D exercises
INSERT INTO lesson_exercises (id, lesson_id, question_he, question_en, answer, hint_he, hint_en, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'כיצד אומרים "דולפין" באנגלית?', 'How do you say "דולפין" in English?', 'Dolphin', 'נשמע כמעט אותו דבר!', 'Sounds almost the same!', 'Dolphin = דולפין 🐬', 'Dolphin = דולפין 🐬', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'כיצד כותבים "כלב" באנגלית?', 'How do you write "כלב" in English?', 'Dog', 'מתחיל ב-D, 3 אותיות', 'Starts with D, 3 letters', 'Dog = כלב 🐕', 'Dog = כלב 🐕', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'השלם: The ___ lived millions of years ago (דינוסאור)', 'Complete: The ___ lived millions of years ago (dinosaur)', 'dinosaur', 'נשמע כמו דינוסאור', 'Sounds like dinosaur', 'Dinosaur = דינוסאור 🦕', 'Dinosaur = דינוסאור 🦕', 3);

-- D quiz questions
INSERT INTO questions (id, lesson_id, type, question_he, question_en, options_he, options_en, correct_index, explanation_he, explanation_en, order_index)
VALUES
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'quiz', 'מה זה "Dog"?', 'What does "Dog" mean?', ARRAY['כלב','חתול','ארנב','עכבר'], ARRAY['Dog','Cat','Rabbit','Mouse'], 0, 'Dog = כלב 🐕', 'Dog = כלב 🐕', 1),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'quiz', 'איזו מילה דומה ל"דרקון"?', 'Which word sounds like "דרקון"?', ARRAY['Dragon','Dog','Duck','Drum'], ARRAY['Dragon','Dog','Duck','Drum'], 0, 'Dragon = דרקון 🐉', 'Dragon = דרקון 🐉', 2),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'quiz', 'מה זה "Diamond"?', 'What does "Diamond" mean?', ARRAY['יהלום','כסף','זהב','רובי'], ARRAY['Diamond','Silver','Gold','Ruby'], 0, 'Diamond = יהלום 💎', 'Diamond = יהלום 💎', 3),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'quiz', 'מה זה "Duck"?', 'What does "Duck" mean?', ARRAY['ברווז','עוף','תרנגול','יונה'], ARRAY['Duck','Chicken','Rooster','Dove'], 0, 'Duck = ברווז 🦆', 'Duck = ברווז 🦆', 4),
(gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'quiz', 'מה זה "Doctor"?', 'What does "Doctor" mean?', ARRAY['רופא','מורה','שוטר','אחות'], ARRAY['Doctor','Teacher','Police','Nurse'], 0, 'Doctor = רופא 👨‍⚕️', 'Doctor = רופא 👨‍⚕️', 5);

-- D mini-game: memory
INSERT INTO mini_games (id, lesson_id, type, title_he, title_en, data, order_index)
VALUES (gen_random_uuid(), 'cccccccc-0000-0000-0000-000000000008', 'memory', '🧠 זכרון — הפוך קלפים ומצא זוגות!', '🧠 Memory — flip cards and find pairs!',
  '[{"word":"Dog","emoji":"🐕","translation":"כלב"},{"word":"Dolphin","emoji":"🐬","translation":"דולפין"},{"word":"Diamond","emoji":"💎","translation":"יהלום"},{"word":"Dragon","emoji":"🐉","translation":"דרקון"},{"word":"Dinosaur","emoji":"🦕","translation":"דינוסאור"},{"word":"Doctor","emoji":"👨‍⚕️","translation":"רופא"},{"word":"Drum","emoji":"🥁","translation":"תוף"},{"word":"Duck","emoji":"🦆","translation":"ברווז"}]'::jsonb, 1);
