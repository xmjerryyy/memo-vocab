import React from 'react'
import { motion } from 'framer-motion'
import { Word } from '../types'
import { Volume2 } from 'lucide-react'

interface StudyCardProps {
  word: Word
  isFlipped: boolean
  onFlip: () => void
}

export const StudyCard: React.FC<StudyCardProps> = ({ word, isFlipped, onFlip }) => {
  return (
    <div className="w-full h-96 relative perspective-1000 group" onClick={onFlip}>
      {/* Front */}
      <motion.div
        className="w-full h-full absolute backface-hidden bg-white rounded-3xl shadow-floating flex flex-col items-center justify-center p-8 cursor-pointer border border-surface-100"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <h2 className="text-5xl font-bold text-surface-900 mb-4 text-center tracking-tight">{word.word}</h2>
          <div className="flex items-center space-x-2 text-surface-500 bg-surface-50 px-4 py-2 rounded-full">
            <Volume2 size={18} />
            <span className="text-lg font-medium font-mono">{word.pronunciation}</span>
          </div>
        </div>
        <div className="mt-auto text-sm text-surface-400 font-medium animate-pulse">
          点击查看释义
        </div>
      </motion.div>

      {/* Back */}
      <motion.div
        className="w-full h-full absolute backface-hidden bg-white rounded-3xl shadow-floating flex flex-col items-center justify-center p-8 cursor-pointer border border-primary-100 ring-2 ring-primary-50"
        initial={false}
        animate={{ rotateY: isFlipped ? 360 : 180 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
      >
        <div className="w-full h-full flex flex-col">
          <div className="text-center pb-6 border-b border-surface-100">
            <h2 className="text-3xl font-bold text-primary-600 mb-2">{word.word}</h2>
            <p className="text-surface-500 font-mono">{word.pronunciation}</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center py-6">
            <p className="text-2xl text-surface-800 font-medium text-center leading-relaxed">{word.meaning}</p>
          </div>

          <div className="bg-surface-50 p-4 rounded-xl">
            <p className="text-surface-600 text-center italic text-sm leading-relaxed">
              "{word.example_sentence}"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
