-- Enable UUID
create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins read all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Trigger: create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;
create or replace trigger on_auth_user_created
  after insert on auth.users for each row execute procedure handle_new_user();

-- Topics
create table if not exists topics (
  id uuid primary key default uuid_generate_v4(),
  title_he text not null,
  title_en text not null,
  description_he text,
  description_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
alter table topics enable row level security;
create policy "Anyone can read topics" on topics for select using (true);
create policy "Admin insert topics" on topics for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin update topics" on topics for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin delete topics" on topics for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Lessons
create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  topic_id uuid not null references topics(id) on delete cascade,
  title_he text not null,
  title_en text not null,
  content_he text,
  content_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
alter table lessons enable row level security;
create policy "Anyone can read lessons" on lessons for select using (true);
create policy "Admin insert lessons" on lessons for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin update lessons" on lessons for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin delete lessons" on lessons for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Lesson images
create table if not exists lesson_images (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  image_url text not null,
  caption_he text,
  caption_en text,
  order_index int not null default 0
);
alter table lesson_images enable row level security;
create policy "Anyone can read images" on lesson_images for select using (true);
create policy "Admin insert images" on lesson_images for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin update images" on lesson_images for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin delete images" on lesson_images for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Questions
create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references lessons(id) on delete cascade,
  topic_id uuid references topics(id) on delete cascade,
  type text not null check (type in ('quiz','test','final')),
  question_he text not null,
  question_en text not null,
  options_he jsonb not null default '[]',
  options_en jsonb not null default '[]',
  correct_index int not null default 0,
  explanation_he text,
  explanation_en text,
  order_index int not null default 0
);
alter table questions enable row level security;
create policy "Anyone can read questions" on questions for select using (true);
create policy "Admin insert questions" on questions for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin update questions" on questions for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin delete questions" on questions for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Student progress
create table if not exists student_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
alter table student_progress enable row level security;
create policy "Users select own progress" on student_progress for select using (auth.uid() = user_id);
create policy "Users insert own progress" on student_progress for insert with check (auth.uid() = user_id);
create policy "Users delete own progress" on student_progress for delete using (auth.uid() = user_id);
create policy "Admins read all progress" on student_progress for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Student scores
create table if not exists student_scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  assessment_type text not null check (assessment_type in ('quiz','test','final')),
  reference_id uuid,
  score int not null,
  max_score int not null,
  completed_at timestamptz not null default now()
);
alter table student_scores enable row level security;
create policy "Users select own scores" on student_scores for select using (auth.uid() = user_id);
create policy "Users insert own scores" on student_scores for insert with check (auth.uid() = user_id);
create policy "Users update own scores" on student_scores for update using (auth.uid() = user_id);
create policy "Admins read all scores" on student_scores for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Storage bucket for images
insert into storage.buckets (id, name, public) values ('anatomy-images', 'anatomy-images', true)
  on conflict (id) do nothing;
create policy "Anyone can view images" on storage.objects for select using (bucket_id = 'anatomy-images');
create policy "Admins can upload images" on storage.objects for insert with check (
  bucket_id = 'anatomy-images' and
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete images" on storage.objects for delete using (
  bucket_id = 'anatomy-images' and
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
