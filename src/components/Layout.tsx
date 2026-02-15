import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Home, BookOpen, Settings, Library, GraduationCap } from 'lucide-react'
import clsx from 'clsx'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-surface-50 text-surface-900 font-sans">
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth no-scrollbar">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-surface-200 safe-area-pb z-50">
        <div className="flex justify-around items-center h-20 px-2 max-w-lg mx-auto">
          <NavItem to="/" icon={Home} label="首页" />
          <NavItem to="/library" icon={Library} label="词书" />
          
          <div className="relative -top-6">
            <NavLink 
              to="/study" 
              className={({ isActive }) => clsx(
                "flex flex-col items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95",
                isActive 
                  ? "bg-primary-600 text-white shadow-primary-300 ring-4 ring-primary-100" 
                  : "bg-surface-900 text-white shadow-surface-300"
              )}
            >
              <GraduationCap size={28} />
            </NavLink>
          </div>

          <NavItem to="/stats" icon={BookOpen} label="统计" /> {/* Placeholder for stats, reused BookOpen */}
          <NavItem to="/settings" icon={Settings} label="设置" />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ to, icon: Icon, label }: { to: string, icon: any, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => clsx(
        "flex flex-col items-center justify-center w-16 h-full transition-colors duration-200",
        isActive ? "text-primary-600" : "text-surface-400 hover:text-surface-600"
      )}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  )
}
