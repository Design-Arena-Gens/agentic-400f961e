'use client'

import { useState, useEffect } from 'react'
import AgentSidebar from './components/AgentSidebar'
import TaskFeed from './components/TaskFeed'
import KnowledgeGraph from './components/KnowledgeGraph'
import CommandBar from './components/CommandBar'
import SystemMetrics from './components/SystemMetrics'
import Header from './components/Header'

export default function Home() {
  const [tasks, setTasks] = useState<Array<{ id: string; agent: string; message: string; type: 'thought' | 'execution' }>>([])
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['GPT-4o', 'Claude 3.5'])

  useEffect(() => {
    const interval = setInterval(() => {
      const agents = ['GPT-4o', 'Claude 3.5', 'NVIDIA Nemotron']
      const thoughts = [
        'Analyzing data patterns...',
        'Optimizing neural pathways...',
        'Processing semantic relationships...',
        'Executing parallel computations...',
        'Synthesizing insights...',
        'Validating model outputs...',
        'Indexing knowledge base...',
        'Computing embeddings...',
        'Running inference pipeline...',
        'Aggregating results...',
      ]
      const executions = [
        'Task #127: Completed data analysis',
        'Task #128: Generated report',
        'Task #129: Updated knowledge graph',
        'Task #130: Processed 1,247 queries',
        'Task #131: Synchronized agents',
        'Task #132: Optimized performance',
        'Task #133: Deployed model update',
        'Task #134: Validated 892 nodes',
        'Task #135: Completed training epoch',
        'Task #136: Refined parameters',
      ]

      const isThought = Math.random() > 0.5
      const newTask = {
        id: Date.now().toString(),
        agent: agents[Math.floor(Math.random() * agents.length)],
        message: isThought
          ? thoughts[Math.floor(Math.random() * thoughts.length)]
          : executions[Math.floor(Math.random() * executions.length)],
        type: (isThought ? 'thought' : 'execution') as 'thought' | 'execution',
      }

      setTasks(prev => [newTask, ...prev].slice(0, 100))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleCommand = (command: string) => {
    const newTask = {
      id: Date.now().toString(),
      agent: 'System',
      message: `Executing command: ${command}`,
      type: 'execution' as const,
    }
    setTasks(prev => [newTask, ...prev].slice(0, 100))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        <AgentSidebar
          selectedAgents={selectedAgents}
          setSelectedAgents={setSelectedAgents}
        />

        <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-6 flex-shrink-0">
            <SystemMetrics />
          </div>

          <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
            <TaskFeed tasks={tasks} />
            <KnowledgeGraph />
          </div>

          <div className="flex-shrink-0">
            <CommandBar onCommand={handleCommand} selectedAgents={selectedAgents} />
          </div>
        </div>
      </div>
    </div>
  )
}
