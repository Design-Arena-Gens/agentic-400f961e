'use client'

import { Brain, Zap, Activity } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-20 glass-strong border-b border-nvidia flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Brain className="w-10 h-10 text-nvidia animate-pulse-glow" />
          <Zap className="w-4 h-4 text-cyber-blue absolute -top-1 -right-1" />
        </div>
        <div>
          <h1 className="text-3xl font-bold neon-text tracking-wider">NEXUS AGI CORE</h1>
          <p className="text-xs text-gray-400 tracking-widest">MULTI-AGENT ORCHESTRATION PLATFORM</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-nvidia animate-pulse" />
          <span className="text-sm text-nvidia font-mono">SYSTEM ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
          <div className="w-2 h-2 bg-nvidia rounded-full animate-pulse"></div>
          <span className="text-xs font-mono">10+ Projects Online</span>
        </div>
      </div>
    </header>
  )
}
