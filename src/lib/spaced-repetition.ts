import { addDays, addMinutes } from 'date-fns'
import { UserProgress, ReviewGrade } from '../types'

// SM-2 Algorithm Implementation (Simplified)
// Reference: https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm

export function calculateNextReview(
  progress: UserProgress,
  grade: ReviewGrade
): UserProgress {
  let { ease_factor, interval, repetitions } = progress

  // If the grade is less than 3, the item is considered forgotten
  if (grade < 3) {
    repetitions = 0
    interval = 1 // Review again tomorrow (or ideally, in 1 minute if immediate)
  } else {
    // Correct response
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * ease_factor)
    }
    repetitions += 1
  }

  // Update Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // q is the grade (0-5)
  // Ensure EF doesn't drop below 1.3
  ease_factor = ease_factor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  if (ease_factor < 1.3) ease_factor = 1.3

  // Calculate next review date
  const next_review = addDays(new Date(), interval).toISOString()

  return {
    ...progress,
    ease_factor,
    interval,
    repetitions,
    next_review,
    status: grade < 3 ? 'learning' : (interval > 21 ? 'mastered' : 'review')
  }
}

export function getInitialProgress(userId: string, wordId: string): UserProgress {
  return {
    id: crypto.randomUUID(), // Assuming client-side generation for optimistic UI, but ideally backend handles this
    user_id: userId,
    word_id: wordId,
    status: 'new',
    next_review: new Date().toISOString(),
    ease_factor: 2.5,
    interval: 0,
    repetitions: 0,
    created_at: new Date().toISOString()
  }
}
