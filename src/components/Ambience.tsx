import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import type { SceneNumber } from '../app/types'

export function FogLayer() {
  return <div className="fog-layer" aria-hidden="true"><i /><i /><i /></div>
}

export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}

export function PixelHeart({ delay = 0, left = '50%' }: { delay?: number; left?: string }) {
  return (
    <motion.span
      className="pixel-heart"
      style={{ left }}
      initial={{ opacity: 0, y: 10, scale: 0.7 }}
      animate={{ opacity: [0, 1, 1, 0], y: [10, -8, -34, -64], scale: [0.7, 1, 0.9, 0.7] }}
      transition={{ duration: 3.8, delay, repeat: Infinity, repeatDelay: 1.4 }}
      aria-hidden="true"
    >
      ♥
    </motion.span>
  )
}

export function SceneShell({ scene, children }: PropsWithChildren<{ scene: SceneNumber }>) {
  const romantic = scene >= 14
  return (
    <main className={`app-shell scene-${scene} ${romantic ? 'romantic-mode' : ''}`}>
      <div className="forest-silhouette" aria-hidden="true" />
      <FogLayer />
      <GrainOverlay />
      {romantic && (
        <div className="heart-field" aria-hidden="true">
          <PixelHeart left="9%" delay={0} />
          <PixelHeart left="27%" delay={1.1} />
          <PixelHeart left="72%" delay={0.6} />
          <PixelHeart left="89%" delay={1.7} />
        </div>
      )}
      <div className="scene-stage">{children}</div>
    </main>
  )
}

export function EvidenceToast({ letter }: { letter: string }) {
  return (
    <motion.div
      className="evidence-toast"
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      role="status"
    >
      <span className="evidence-icon">✦</span>
      <span><small>Найдена улика</small><strong>Символ «{letter}»</strong></span>
    </motion.div>
  )
}
