'use client'

import { useEffect, useRef } from 'react'
import { Terminal, Brain, Zap } from 'lucide-react'

interface Task {
  id: string
  agent: string
  message: string
  type: 'thought' | 'execution'
}

export default function TaskFeed({ tasks }: { tasks: Task[] }) {
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0
    }
  }, [tasks])

  return (
    <div className="glass-strong rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-nvidia flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          REAL-TIME TASK FEED
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-nvidia rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400 font-mono">LIVE</span>
        </div>
      </div>

      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto scrollbar-thin space-y-2 font-mono text-sm"
      >
        {tasks.map((task, idx) => (
          <div
            key={task.id}
            className="glass p-3 rounded-lg animate-slide-up hover:border-nvidia/50 transition-all cursor-pointer"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              {task.type === 'thought' ? (
                <Brain className="w-4 h-4 text-cyber-blue flex-shrink-0 mt-0.5" />
              ) : (
                <Zap className="w-4 h-4 text-nvidia flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${
                    task.type === 'thought' ? 'text-cyber-blue' : 'text-nvidia'
                  }`}>
                    [{task.agent}]
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed break-words">
                  {task.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>{tasks.length} events logged</span>
        <button className="text-nvidia hover:text-nvidia/80 transition-colors">
          Clear Feed
        </button>
      </div>
    </div>
  )
}
