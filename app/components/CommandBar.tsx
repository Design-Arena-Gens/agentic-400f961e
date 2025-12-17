'use client'

import { useState } from 'react'
import { Send, Sparkles, Command } from 'lucide-react'

export default function CommandBar({
  onCommand,
  selectedAgents
}: {
  onCommand: (command: string) => void
  selectedAgents: string[]
}) {
  const [command, setCommand] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      onCommand(command)
      setCommand('')
    }
  }

  return (
    <div className="glass-strong rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Command className="w-5 h-5 text-nvidia" />
        <h2 className="text-lg font-bold text-nvidia">UNIFIED COMMAND CENTER</h2>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Sparkles className="w-4 h-4 text-cyber-blue" />
          <span>{selectedAgents.length} agents active</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command to execute across all agents... (e.g., 'analyze user sentiment', 'generate weekly report')"
            className="w-full bg-cyber-darker border border-nvidia/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-nvidia focus:shadow-lg focus:shadow-nvidia/20 transition-all font-mono text-sm"
          />
          {selectedAgents.length > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              {selectedAgents.slice(0, 3).map((agent, idx) => (
                <div
                  key={agent}
                  className="w-2 h-2 rounded-full bg-nvidia animate-pulse"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                ></div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-nvidia hover:bg-nvidia/80 text-cyber-darker px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-nvidia/50"
        >
          <Send className="w-4 h-4" />
          EXECUTE
        </button>
      </form>

      <div className="mt-4 flex gap-2 flex-wrap">
        {['Analyze data', 'Generate report', 'Optimize models', 'Sync databases', 'Deploy updates'].map(suggestion => (
          <button
            key={suggestion}
            onClick={() => setCommand(suggestion)}
            className="glass px-3 py-1 rounded-full text-xs text-gray-400 hover:text-nvidia hover:border-nvidia/50 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
