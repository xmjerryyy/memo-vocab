export interface Profile {
  id: string
  username: string
  daily_goal: number
  current_book_id: string | null
  created_at: string
}

export interface Book {
  id: string
  title: string
  description: string
  word_count: number
  created_at: string
}

export interface Word {
  id: string
  book_id: string
  word: string
  meaning: string
  pronunciation: string
  example_sentence: string
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  word_id: string
  status: 'new' | 'learning' | 'review' | 'mastered'
  next_review: string
  ease_factor: number
  interval: number
  repetitions: number
  created_at: string
}

export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5
// 0: Blackout, 1: Wrong, 2: Hard, 3: Good, 4: Easy, 5: Perfect (optional)
