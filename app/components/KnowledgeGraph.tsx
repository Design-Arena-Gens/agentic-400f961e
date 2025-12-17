'use client'

import { useEffect, useState } from 'react'
import { Network, GitBranch, Database, Brain, Zap, Cpu, Globe } from 'lucide-react'

interface Node {
  id: number
  x: number
  y: number
  label: string
  icon: any
  connections: number[]
}

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  useEffect(() => {
    const icons = [Brain, Database, Cpu, Globe, Zap, GitBranch]
    const labels = ['Neural Net', 'Data Lake', 'Processing', 'Web Scraper', 'Inference', 'Version Ctrl']

    const initialNodes: Node[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      label: labels[i % labels.length],
      icon: icons[i % icons.length],
      connections: [],
    }))

    initialNodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numConnections; j++) {
        const targetId = Math.floor(Math.random() * initialNodes.length)
        if (targetId !== i && !node.connections.includes(targetId)) {
          node.connections.push(targetId)
        }
      }
    })

    setNodes(initialNodes)

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        x: Math.max(5, Math.min(95, node.x + (Math.random() - 0.5) * 2)),
        y: Math.max(5, Math.min(95, node.y + (Math.random() - 0.5) * 2)),
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-strong rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-nvidia flex items-center gap-2">
          <Network className="w-5 h-5" />
          KNOWLEDGE GRAPH
        </h2>
        <button className="text-xs text-gray-400 hover:text-nvidia transition-colors">
          Expand View
        </button>
      </div>

      <div className="flex-1 relative bg-cyber-darker/50 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {nodes.map(node =>
            node.connections.map(targetId => {
              const target = nodes[targetId]
              return target ? (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(118, 185, 0, 0.3)"
                  strokeWidth="1"
                  className="transition-all duration-1000"
                />
              ) : null
            })
          )}

          {nodes.map(node => {
            const Icon = node.icon
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}%, ${node.y}%)`}
                className="transition-all duration-1000 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r={hoveredNode === node.id ? "20" : "15"}
                  fill="rgba(10, 14, 39, 0.9)"
                  stroke="#76B900"
                  strokeWidth="2"
                  className="transition-all"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#76B900"
                  opacity="0.3"
                  className="animate-pulse"
                />
              </g>
            )
          })}
        </svg>

        {nodes.map(node => {
          const Icon = node.icon
          return (
            <div
              key={`label-${node.id}`}
              className="absolute transition-all duration-1000 pointer-events-none"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Icon className="w-4 h-4 text-nvidia" />
            </div>
          )
        })}

        {hoveredNode !== null && (
          <div
            className="absolute glass-strong p-2 rounded-lg pointer-events-none"
            style={{
              left: `${nodes[hoveredNode].x}%`,
              top: `${nodes[hoveredNode].y}%`,
              transform: 'translate(-50%, -150%)',
            }}
          >
            <p className="text-xs text-nvidia font-semibold whitespace-nowrap">
              {nodes[hoveredNode].label}
            </p>
            <p className="text-xs text-gray-400">
              {nodes[hoveredNode].connections.length} connections
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="glass p-2 rounded text-center">
          <p className="text-gray-400">Nodes</p>
          <p className="text-nvidia font-bold">{nodes.length}</p>
        </div>
        <div className="glass p-2 rounded text-center">
          <p className="text-gray-400">Edges</p>
          <p className="text-cyber-blue font-bold">
            {nodes.reduce((acc, n) => acc + n.connections.length, 0)}
          </p>
        </div>
        <div className="glass p-2 rounded text-center">
          <p className="text-gray-400">Depth</p>
          <p className="text-cyber-purple font-bold">5</p>
        </div>
      </div>
    </div>
  )
}
