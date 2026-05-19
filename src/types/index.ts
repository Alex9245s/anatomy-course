export type Lang = 'he' | 'en';

export interface Profile {
  id: string;
  full_name: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface Topic {
  id: string;
  title_he: string;
  title_en: string;
  description_he: string | null;
  description_en: string | null;
  order_index: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  topic_id: string;
  title_he: string;
  title_en: string;
  content_he: string | null;
  content_en: string | null;
  order_index: number;
  created_at: string;
  images?: LessonImage[];
}

export interface LessonImage {
  id: string;
  lesson_id: string;
  image_url: string;
  caption_he: string | null;
  caption_en: string | null;
  order_index: number;
}

export interface Question {
  id: string;
  lesson_id: string | null;
  topic_id: string | null;
  type: 'quiz' | 'test' | 'final';
  question_he: string;
  question_en: string;
  options_he: string[];
  options_en: string[];
  correct_index: number;
  explanation_he: string | null;
  explanation_en: string | null;
  order_index: number;
}

export interface StudentProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface StudentScore {
  id: string;
  user_id: string;
  assessment_type: 'quiz' | 'test' | 'final';
  reference_id: string | null;
  score: number;
  max_score: number;
  completed_at: string;
}
