-- =============================================================
-- Migration 017: Content Rewrite — 6 Mini-Game Types
-- One unique mini-game per letter (S,T,P,M,I,A,N,D)
-- =============================================================

-- 1. Update type constraint to allow all 6 game types
ALTER TABLE mini_games DROP CONSTRAINT IF EXISTS mini_games_type_check;
ALTER TABLE mini_games ADD CONSTRAINT mini_games_type_check
  CHECK (type IN ('memory', 'scramble', 'match', 'fill-blank', 'spelling', 'sort'));

-- 2. Remove old mini_games for all 8 English lessons
DELETE FROM mini_games WHERE lesson_id IN (
  'cccccccc-0000-0000-0000-000000000010',
  'cccccccc-0000-0000-0000-000000000011',
  'cccccccc-0000-0000-0000-000000000013',
  'cccccccc-0000-0000-0000-000000000014',
  'cccccccc-0000-0000-0000-000000000015',
  'cccccccc-0000-0000-0000-000000000017',
  'cccccccc-0000-0000-0000-000000000018',
  'cccccccc-0000-0000-0000-000000000019'
);

-- =============================================================
-- 3. Insert NEW mini-games — one per lesson, 6 types varied
-- =============================================================

-- Letter S → MATCH
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000010',
  'match',
  '🔗 חבר מילה לתרגום — האות S',
  '🔗 Match Word & Translation — Letter S',
  '[
    {"word":"sun","emoji":"☀️","translation":"שמש"},
    {"word":"star","emoji":"⭐","translation":"כוכב"},
    {"word":"snow","emoji":"❄️","translation":"שלג"},
    {"word":"shark","emoji":"🦈","translation":"כריש"},
    {"word":"sock","emoji":"🧦","translation":"גרב"},
    {"word":"sing","emoji":"🎤","translation":"לשיר"}
  ]'::jsonb,
  1
);

-- Letter T → FILL-BLANK
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000011',
  'fill-blank',
  '📝 השלם את המשפט — האות T',
  '📝 Fill in the Blank — Letter T',
  '[
    {"sentence":"I climb up the ___ to pick apples.","answer":"tree","choices":["tree","train","tent","taxi"],"translation":"אני מטפס על ___ כדי לקטוף תפוחים."},
    {"sentence":"The ___ arrives at the station at noon.","answer":"train","choices":["tiger","train","table","tooth"],"translation":"ה___ מגיע לתחנה בצהריים."},
    {"sentence":"We eat dinner at the kitchen ___.","answer":"table","choices":["tree","taxi","table","tent"],"translation":"אנחנו אוכלים ארוחת ערב ליד ___ במטבח."},
    {"sentence":"I call a ___ when it rains hard.","answer":"taxi","choices":["tiger","taxi","torch","table"],"translation":"אני מזמין ___ כשיורד גשם חזק."}
  ]'::jsonb,
  1
);

-- Letter P → SPELLING
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000013',
  'spelling',
  '✍️ איות — האות P',
  '✍️ Spelling Challenge — Letter P',
  '[
    {"word":"pizza","emoji":"🍕","translation":"פיצה"},
    {"word":"pear","emoji":"🍐","translation":"אגס"},
    {"word":"penguin","emoji":"🐧","translation":"פינגווין"},
    {"word":"pencil","emoji":"✏️","translation":"עיפרון"},
    {"word":"parrot","emoji":"🦜","translation":"תוכי"},
    {"word":"pillow","emoji":"🛏️","translation":"כרית"}
  ]'::jsonb,
  1
);

-- Letter M → SORT
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000014',
  'sort',
  '🗂️ מיין לפי קטגוריה — האות M',
  '🗂️ Sort into Categories — Letter M',
  '[
    {"word":"moon","emoji":"🌙","category":"noun"},
    {"word":"mushroom","emoji":"🍄","category":"noun"},
    {"word":"mirror","emoji":"🪞","category":"noun"},
    {"word":"mango","emoji":"🥭","category":"noun"},
    {"word":"move","emoji":"🏃","category":"verb"},
    {"word":"mix","emoji":"🥄","category":"verb"},
    {"word":"melt","emoji":"🫠","category":"verb"},
    {"word":"march","emoji":"💂","category":"verb"}
  ]'::jsonb,
  1
);

-- Letter I → MEMORY
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000015',
  'memory',
  '🃏 משחק זיכרון — האות I',
  '🃏 Memory Game — Letter I',
  '[
    {"word":"ice","emoji":"🧊","translation":"קרח"},
    {"word":"island","emoji":"🏝️","translation":"אי"},
    {"word":"igloo","emoji":"🛖","translation":"איגלו"},
    {"word":"ink","emoji":"🖊️","translation":"דיו"},
    {"word":"iron","emoji":"👕","translation":"מגהץ"},
    {"word":"insect","emoji":"🐛","translation":"חרק"}
  ]'::jsonb,
  1
);

-- Letter A → SCRAMBLE
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000017',
  'scramble',
  '🔤 ערבב ותגלה — האות A',
  '🔤 Word Scramble — Letter A',
  '[
    {"word":"ant","emoji":"🐜","translation":"נמלה"},
    {"word":"apple","emoji":"🍎","translation":"תפוח"},
    {"word":"arrow","emoji":"➡️","translation":"חץ"},
    {"word":"avocado","emoji":"🥑","translation":"אבוקדו"},
    {"word":"axe","emoji":"🪓","translation":"גרזן"},
    {"word":"anchor","emoji":"⚓","translation":"עוגן"}
  ]'::jsonb,
  1
);

-- Letter N → MATCH
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000018',
  'match',
  '🔗 חבר מילה לתרגום — האות N',
  '🔗 Match Word & Translation — Letter N',
  '[
    {"word":"nest","emoji":"🪹","translation":"קן"},
    {"word":"night","emoji":"🌃","translation":"לילה"},
    {"word":"nose","emoji":"👃","translation":"אף"},
    {"word":"needle","emoji":"🧵","translation":"מחט"},
    {"word":"nut","emoji":"🥜","translation":"אגוז"},
    {"word":"napkin","emoji":"🧻","translation":"מפית"}
  ]'::jsonb,
  1
);

-- Letter D → FILL-BLANK
INSERT INTO mini_games (lesson_id, type, title_he, title_en, data, order_index)
VALUES (
  'cccccccc-0000-0000-0000-000000000019',
  'fill-blank',
  '📝 השלם את המשפט — האות D',
  '📝 Fill in the Blank — Letter D',
  '[
    {"sentence":"The ___ barks at the mailman every morning.","answer":"dog","choices":["dog","door","desk","drum"],"translation":"ה___ נובח על הדוור כל בוקר."},
    {"sentence":"Please close the ___ — it is cold outside.","answer":"door","choices":["drum","door","duck","desk"],"translation":"אנא סגור את ה___ — קר בחוץ."},
    {"sentence":"I do my homework at my ___.","answer":"desk","choices":["duck","door","desk","drum"],"translation":"אני עושה שיעורי בית ליד ה___ שלי."},
    {"sentence":"She plays the ___ at the school concert.","answer":"drum","choices":["door","duck","desk","drum"],"translation":"היא מנגנת ב___ בקונצרט בית הספר."}
  ]'::jsonb,
  1
);
