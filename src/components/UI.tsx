import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & { children?: ReactNode }

export function GlassPanel({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`glass-panel ${className}`}>{children}</div>
}

export function SceneHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: string }) {
  return (
    <header className="scene-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  )
}

export function PrimaryButton({ children, className = '', ...props }: MotionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={`button button-primary ${className}`}
      type="button"
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="button-arrow">↗</span>
    </motion.button>
  )
}

export function SecondaryButton({ children, className = '', ...props }: MotionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={`button button-secondary ${className}`}
      type="button"
      {...props}
    >
      {children}
    </motion.button>
  )
}

interface ChoiceCardProps extends Omit<MotionButtonProps, 'children'> {
  label: string
  emoji?: string
  selected?: boolean
  state?: 'idle' | 'correct' | 'wrong'
}

export function ChoiceCard({ label, emoji, selected, state = 'idle', className = '', ...props }: ChoiceCardProps) {
  return (
    <motion.button
      layout
      whileTap={{ scale: 0.985 }}
      className={`choice-card ${selected ? 'is-selected' : ''} is-${state} ${className}`}
      type="button"
      {...props}
    >
      {emoji && <span className="choice-emoji" aria-hidden="true">{emoji}</span>}
      <span>{label}</span>
      <span className="choice-indicator" aria-hidden="true">{selected ? '●' : '○'}</span>
    </motion.button>
  )
}

export function StatusPill({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'pink' | 'wine' }>) {
  return <span className={`status-pill tone-${tone}`}>{children}</span>
}

export function InlineFeedback({ children, success }: PropsWithChildren<{ success: boolean }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-feedback ${success ? 'success' : 'failure'}`}
      role="status"
    >
      <span aria-hidden="true">{success ? '✓' : '↺'}</span>
      {children}
    </motion.div>
  )
}

export function ProgressHint({ scene, total }: { scene: number; total: number }) {
  const visibleProgress = Math.max(0, Math.min(100, ((scene - 1) / (total - 1)) * 100))
  return (
    <div className="progress-hint" aria-label={`Сцена ${scene} из ${total}`}>
      <span>{String(scene).padStart(2, '0')}</span>
      <div className="progress-track"><i style={{ width: `${visibleProgress}%` }} /></div>
      <span>{String(total).padStart(2, '0')}</span>
    </div>
  )
}
