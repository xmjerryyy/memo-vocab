import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Book } from '../types'
import { Plus, Book as BookIcon } from 'lucide-react'

export default function Library() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books').select('*')
      if (!error && data) setBooks(data)
    }
    fetchBooks()
  }, [])

  return (
    <div className="p-6 pb-32 max-w-lg mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">词书库</h1>
        <p className="text-surface-500 text-sm mt-1">选择一本词书开始学习吧</p>
      </header>
      
      <div className="grid gap-4">
        {books.map(book => (
          <div key={book.id} className="bg-white p-5 rounded-2xl shadow-soft border border-surface-100 flex justify-between items-center group hover:shadow-card transition-all duration-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-primary-600 shadow-sm group-hover:scale-105 transition-transform">
                <BookIcon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-surface-900 group-hover:text-primary-700 transition-colors">{book.title}</h3>
                <p className="text-sm text-surface-500 mt-1 line-clamp-1">{book.description}</p>
                <span className="inline-block mt-2 text-xs font-medium bg-surface-100 text-surface-600 px-2 py-0.5 rounded-md">
                  {book.word_count} 词
                </span>
              </div>
            </div>
            <button className="p-3 bg-surface-50 text-surface-400 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <Plus size={20} />
            </button>
          </div>
        ))}
        
        {books.length === 0 && (
          <div className="text-center py-16">
             <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookIcon size={32} className="text-surface-400" />
             </div>
            <p className="text-surface-500 font-medium">暂无词书</p>
            <p className="text-sm text-surface-400 mt-1">请联系管理员添加或稍后再试</p>
          </div>
        )}
      </div>
    </div>
  )
}
