import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, Calendar, Zap, ArrowRight, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="p-6 max-w-lg mx-auto pb-32">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">早安，同学！</h1>
          <p className="text-surface-500 text-sm mt-1">今天也要加油背单词哦 ✨</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-tr from-primary-400 to-primary-600 rounded-full shadow-lg p-0.5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="avatar" 
            className="w-full h-full rounded-full bg-white"
          />
        </div>
      </header>

      {/* Hero Card */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white shadow-floating relative overflow-hidden mb-8 group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-primary-100 text-xs font-medium uppercase tracking-wider mb-1">今日目标</p>
              <h2 className="text-4xl font-bold tracking-tight">20 <span className="text-lg font-normal text-primary-200">/ 50</span></h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl shadow-inner border border-white/10">
              <TrendingUp size={24} className="text-primary-100" />
            </div>
          </div>
          
          <div className="w-full bg-black/20 rounded-full h-3 mb-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-300 to-emerald-400 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-1000 ease-out w-[40%]"
            ></div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-primary-100 font-medium">
            <span>已完成 40%</span>
            <span>还需 30 个单词</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-surface-100 hover:shadow-card transition-shadow">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
              <BookOpen size={18} />
            </div>
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wide">在学词书</span>
          </div>
          <p className="text-surface-900 font-bold text-lg leading-tight line-clamp-1">CET-4 核心词汇</p>
          <p className="text-xs text-surface-400 mt-1">剩余 1240 词</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-surface-100 hover:shadow-card transition-shadow">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-green-50 text-green-500 rounded-lg">
              <Award size={18} />
            </div>
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wide">坚持天数</span>
          </div>
          <p className="text-surface-900 font-bold text-lg leading-tight">12 天</p>
          <p className="text-xs text-surface-400 mt-1">超越 85% 用户</p>
        </div>
      </div>

      {/* Action Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold text-surface-900">开始学习</h3>
          <Link to="/study" className="text-primary-600 text-sm font-medium hover:text-primary-700">查看计划</Link>
        </div>
        
        <Link to="/study" className="group block w-full bg-white p-5 rounded-2xl border border-surface-100 shadow-soft hover:shadow-lg hover:border-primary-100 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <Zap size={28} fill="currentColor" className="group-hover:animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-surface-900 text-lg group-hover:text-primary-700 transition-colors">每日复习</p>
                <p className="text-sm text-surface-500 mt-0.5">包含 15 个需复习单词</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </section>
    </div>
  )
}
