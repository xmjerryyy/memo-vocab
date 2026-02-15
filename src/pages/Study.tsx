import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useStore } from '../store/useStore'
import { Word, UserProgress, ReviewGrade } from '../types'
import { calculateNextReview, getInitialProgress } from '../lib/spaced-repetition'
import { StudyCard } from '../components/StudyCard'
import { Check, X, Clock, ThumbsUp, Loader2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Study() {
  const { session } = useStore()
  const [queue, setQueue] = useState<{ word: Word, progress: UserProgress }[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user) return
    fetchDueWords()
  }, [session])

  const fetchDueWords = async () => {
    try {
      setLoading(true)
      const now = new Date().toISOString()

      // 1. Fetch items due for review
      const { data: dueItems, error: dueError } = await supabase
        .from('user_progress')
        .select(`
          *,
          word:words(*)
        `)
        .eq('user_id', session!.user.id)
        .lte('next_review', now)
        .order('next_review', { ascending: true })
        .limit(20)

      if (dueError) throw dueError

      // 2. If not enough review items, fetch new words
      let newWords: any[] = []
      if (!dueItems || dueItems.length < 10) {
        const { data: newWordsData } = await supabase
          .from('words')
          .select('*')
          .limit(10 - (dueItems?.length || 0))
        
        newWords = newWordsData || []
      }

      const formattedQueue = [
        ...(dueItems?.map(item => ({ word: item.word, progress: item })) || []),
        ...newWords.map(word => ({ word, progress: getInitialProgress(session!.user.id, word.id) }))
      ]

      setQueue(formattedQueue)
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGrade = async (grade: ReviewGrade) => {
    const currentItem = queue[currentIndex]
    if (!currentItem) return

    const newProgress = calculateNextReview(currentItem.progress, grade)
    const nextQueue = [...queue]
    nextQueue[currentIndex].progress = newProgress
    
    if (grade < 3) {
      nextQueue.push({ ...currentItem, progress: newProgress })
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        id: newProgress.id,
        user_id: session!.user.id,
        word_id: currentItem.word.id,
        status: newProgress.status,
        next_review: newProgress.next_review,
        ease_factor: newProgress.ease_factor,
        interval: newProgress.interval,
        repetitions: newProgress.repetitions
      })

    if (error) console.error('Error saving progress:', error)

    setIsFlipped(false)
    if (currentIndex < nextQueue.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      alert('今日学习完成！')
      fetchDueWords()
      setCurrentIndex(0)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-full min-h-screen bg-surface-50">
      <div className="flex flex-col items-center text-primary-600">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-medium">准备单词中...</p>
      </div>
    </div>
  )

  if (queue.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-screen">
      <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mb-6">
        <Check size={48} className="text-primary-500" />
      </div>
      <h2 className="text-2xl font-bold text-surface-900 mb-2">暂无待复习单词</h2>
      <p className="text-surface-500 mb-8">休息一下，或者去词书库添加更多单词吧！</p>
      <Link to="/library" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200">
        去词书库
      </Link>
    </div>
  )

  const currentItem = queue[currentIndex]

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-6 px-4 max-w-lg mx-auto bg-surface-50">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 px-2">
        <Link to="/" className="p-2 -ml-2 text-surface-500 hover:text-surface-900 transition">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">当前进度</span>
          <span className="text-sm font-bold text-surface-900">{currentIndex + 1} <span className="text-surface-400">/</span> {queue.length}</span>
        </div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Card Area */}
      <div className="w-full flex-1 flex items-center justify-center mb-8">
        <StudyCard 
          word={currentItem.word} 
          isFlipped={isFlipped} 
          onFlip={() => setIsFlipped(!isFlipped)} 
        />
      </div>

      {/* Controls */}
      <div className="w-full h-24 mb-6">
        {!isFlipped ? (
          <button 
            onClick={() => setIsFlipped(true)}
            className="w-full h-16 bg-surface-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            显示答案
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            <GradeButton 
              grade={1} 
              icon={X} 
              label="忘记" 
              color="text-danger-500 bg-danger-50 hover:bg-danger-100 border-danger-200" 
              onClick={() => handleGrade(1)} 
            />
            <GradeButton 
              grade={2} 
              icon={Clock} 
              label="模糊" 
              color="text-warning-500 bg-warning-50 hover:bg-warning-100 border-warning-200" 
              onClick={() => handleGrade(2)} 
            />
            <GradeButton 
              grade={3} 
              icon={Check} 
              label="认识" 
              color="text-primary-500 bg-primary-50 hover:bg-primary-100 border-primary-200" 
              onClick={() => handleGrade(3)} 
            />
            <GradeButton 
              grade={4} 
              icon={ThumbsUp} 
              label="简单" 
              color="text-success-500 bg-success-50 hover:bg-success-100 border-success-200" 
              onClick={() => handleGrade(4)} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

function GradeButton({ grade, icon: Icon, label, color, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center justify-center h-20 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${color}`}
    >
      <Icon size={24} strokeWidth={2.5} className="mb-1" />
      <span className="text-xs font-bold">{label}</span>
    </button>
  )
}
