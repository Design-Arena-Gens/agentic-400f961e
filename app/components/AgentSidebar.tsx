'use client'

import { useState } from 'react'
import { Bot, CheckCircle2, Circle, Settings, Power } from 'lucide-react'

interface Agent {
  name: string
  status: 'active' | 'idle' | 'processing'
  tasks: number
  icon: string
}

const agents: Agent[] = [
  { name: 'GPT-4o', status: 'active', tasks: 127, icon: '🔷' },
  { name: 'Claude 3.5', status: 'active', tasks: 89, icon: '🟣' },
  { name: 'NVIDIA Nemotron', status: 'processing', tasks: 156, icon: '🟢' },
  { name: 'Gemini Pro', status: 'idle', tasks: 0, icon: '🔶' },
  { name: 'LLaMA 3', status: 'active', tasks: 45, icon: '🔵' },
  { name: 'Mistral Large', status: 'idle', tasks: 0, icon: '⚪' },
]

export default function AgentSidebar({
  selectedAgents,
  setSelectedAgents
}: {
  selectedAgents: string[]
  setSelectedAgents: (agents: string[]) => void
}) {
  const toggleAgent = (agentName: string) => {
    if (selectedAgents.includes(agentName)) {
      setSelectedAgents(selectedAgents.filter(a => a !== agentName))
    } else {
      setSelectedAgents([...selectedAgents, agentName])
    }
  }

  return (
    <aside className="w-80 glass-strong border-r border-nvidia p-6 overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-nvidia flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AGENT STUDIO
        </h2>
        <Settings className="w-5 h-5 text-gray-400 hover:text-nvidia cursor-pointer transition-colors" />
      </div>

      <div className="space-y-3">
        {agents.map((agent, idx) => (
          <div
            key={agent.name}
            onClick={() => toggleAgent(agent.name)}
            className={`glass p-4 rounded-lg cursor-pointer transition-all hover:border-nvidia ${
              selectedAgents.includes(agent.name) ? 'border-nvidia shadow-lg shadow-nvidia/20' : ''
            } animate-slide-up`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{agent.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{agent.name}</h3>
                  <p className="text-xs text-gray-400 font-mono">{agent.tasks} tasks</p>
                </div>
              </div>
              {selectedAgents.includes(agent.name) ? (
                <CheckCircle2 className="w-5 h-5 text-nvidia" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === 'active' ? 'bg-nvidia animate-pulse' :
                  agent.status === 'processing' ? 'bg-cyber-blue animate-pulse' :
                  'bg-gray-600'
                }`}></div>
                <span className="text-xs text-gray-400 uppercase">{agent.status}</span>
              </div>
              <Power className="w-4 h-4 text-gray-600 hover:text-nvidia transition-colors" />
            </div>

            {agent.status !== 'idle' && (
              <div className="mt-3 bg-cyber-darker rounded h-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-nvidia to-cyber-blue animate-pulse"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-6 glass-strong border border-nvidia text-nvidia py-3 rounded-lg hover:bg-nvidia/10 transition-all font-semibold text-sm">
        + ADD NEW AGENT
      </button>
    </aside>
  )
}
