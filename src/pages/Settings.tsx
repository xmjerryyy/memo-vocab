import React from 'react'
import { supabase } from '../lib/supabase'
import { LogOut, Bell, Moon, User, ChevronRight } from 'lucide-react'

export default function Settings() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div className="p-6 pb-32 max-w-lg mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">设置</h1>
      </header>

      <div className="bg-white rounded-2xl shadow-soft border border-surface-100 overflow-hidden mb-6">
        <SettingItem icon={User} label="个人资料" />
        <div className="h-px bg-surface-50 mx-4" />
        <SettingItem icon={Bell} label="每日提醒" hasToggle />
        <div className="h-px bg-surface-50 mx-4" />
        <SettingItem icon={Moon} label="深色模式" hasToggle />
      </div>

      <button 
        onClick={handleLogout}
        className="w-full bg-danger-50 text-danger-500 p-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-danger-100 transition-colors active:scale-[0.98]"
      >
        <LogOut size={20} />
        <span>退出登录</span>
      </button>
      
      <p className="text-center text-xs text-surface-300 mt-8">
        Memo Vocab v1.0.0
      </p>
    </div>
  )
}

function SettingItem({ icon: Icon, label, hasToggle = false }: any) {
  return (
    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-surface-100 rounded-lg text-surface-600">
          <Icon size={20} />
        </div>
        <span className="text-surface-700 font-medium">{label}</span>
      </div>
      {hasToggle ? (
        <div className="w-11 h-6 bg-surface-200 rounded-full relative cursor-pointer transition-colors hover:bg-surface-300">
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
        </div>
      ) : (
        <ChevronRight size={20} className="text-surface-300" />
      )}
    </div>
  )
}
