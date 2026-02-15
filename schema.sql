-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text,
  daily_goal integer default 20,
  current_book_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- BOOKS
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  word_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.books enable row level security;

create policy "Books are viewable by everyone."
  on books for select
  using ( true );

-- WORDS
create table public.words (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books on delete cascade not null,
  word text not null,
  meaning text not null,
  pronunciation text,
  example_sentence text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.words enable row level security;

create policy "Words are viewable by everyone."
  on words for select
  using ( true );

-- USER PROGRESS
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  word_id uuid references public.words on delete cascade not null,
  status text check (status in ('new', 'learning', 'review', 'mastered')) default 'new',
  next_review timestamp with time zone default timezone('utc'::text, now()),
  ease_factor float default 2.5,
  interval integer default 0,
  repetitions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, word_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress."
  on user_progress for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own progress."
  on user_progress for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own progress."
  on user_progress for update
  using ( auth.uid() = user_id );

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- SEED DATA (Optional)
insert into public.books (title, description, word_count)
values ('CET-4 Core', 'Essential vocabulary for CET-4 exam', 10);

-- Insert some dummy words for the first book (assuming we get the ID)
-- You would need to replace the book_id with the actual ID generated above
