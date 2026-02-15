import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Mail, Lock } from 'lucide-react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert('请查收邮件验证您的账号！')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        navigate('/')
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-surface-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-100 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-48 -left-24 w-64 h-64 bg-primary-300 rounded-full blur-3xl opacity-30" />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl shadow-lg mb-4 transform rotate-3">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Memo Vocab</h1>
          <p className="text-surface-500 mt-2">每天进步一点点，记忆更轻松</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-floating p-8">
          <h2 className="text-xl font-bold mb-6 text-surface-800">
            {isSignUp ? '创建新账号' : '欢迎回来'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-600 mb-1.5 ml-1">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-surface-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-surface-900 placeholder-surface-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-surface-600 mb-1.5 ml-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-surface-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-surface-900 placeholder-surface-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? '处理中...' : (isSignUp ? '立即注册' : '登录')}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-surface-500 text-sm">
            {isSignUp ? '已有账号？' : '还没有账号？'}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-primary-600 font-semibold hover:text-primary-700 transition"
            >
              {isSignUp ? '去登录' : '去注册'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
