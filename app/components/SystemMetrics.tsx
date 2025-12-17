'use client'

import { useState, useEffect } from 'react'
import { Cpu, Gauge, Zap } from 'lucide-react'

export default function SystemMetrics() {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [gpuUsage, setGpuUsage] = useState(78)
  const [reasoningSpeed, setReasoningSpeed] = useState(92)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)))
      setGpuUsage(prev => Math.max(30, Math.min(98, prev + (Math.random() - 0.5) * 8)))
      setReasoningSpeed(prev => Math.max(70, Math.min(99, prev + (Math.random() - 0.5) * 5)))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    color
  }: {
    icon: any
    label: string
    value: number
    color: string
  }) => (
    <div className="glass-strong rounded-xl p-6 hover:border-nvidia/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="font-semibold text-sm text-gray-300">{label}</h3>
        </div>
        <span className={`text-2xl font-bold ${color}`}>{Math.round(value)}%</span>
      </div>

      <div className="relative h-2 bg-cyber-darker rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-500 ${
            color === 'text-nvidia' ? 'bg-nvidia' :
            color === 'text-cyber-blue' ? 'bg-cyber-blue' :
            'bg-cyber-purple'
          }`}
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )

  return (
    <>
      <MetricCard icon={Cpu} label="CPU Usage" value={cpuUsage} color="text-nvidia" />
      <MetricCard icon={Cpu} label="GPU Usage" value={gpuUsage} color="text-cyber-blue" />
      <MetricCard icon={Zap} label="Reasoning Speed" value={reasoningSpeed} color="text-cyber-purple" />
    </>
  )
}
