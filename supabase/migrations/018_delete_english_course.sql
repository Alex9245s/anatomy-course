-- =============================================================
-- Migration 018: Delete all English course content
-- Clears lessons, exercises, quiz questions, and mini-games
-- for the RESTART English topic so a fresh course can be built.
-- =============================================================

-- English lesson IDs (S, T, P, M, I, A, N, D + review lessons)
-- Topic: bbbbbbbb-0000-0000-0000-000000000003
-- Course: aaaaaaaa-0000-0000-0000-000000000001

-- 1. Delete mini_games for all English lessons
DELETE FROM mini_games
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE topic_id = 'bbbbbbbb-0000-0000-0000-000000000003'
);

-- 2. Delete quiz questions for all English lessons
DELETE FROM questions
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE topic_id = 'bbbbbbbb-0000-0000-0000-000000000003'
);

-- 3. Delete exercises for all English lessons
DELETE FROM lesson_exercises
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE topic_id = 'bbbbbbbb-0000-0000-0000-000000000003'
);

-- 4. Delete lesson progress for all English lessons
DELETE FROM student_progress
WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE topic_id = 'bbbbbbbb-0000-0000-0000-000000000003'
);

-- 5. Delete all English lessons
DELETE FROM lessons
WHERE topic_id = 'bbbbbbbb-0000-0000-0000-000000000003';

-- 6. Delete the English topic itself
DELETE FROM topics
WHERE id = 'bbbbbbbb-0000-0000-0000-000000000003';
