import { useState } from 'react'
import { motion } from 'framer-motion'
import { invitation } from '../app/content'
import { GlassPanel, PrimaryButton, SecondaryButton, StatusPill } from '../components/UI'

export function Scene15Invitation({ onDecision }: { onDecision: (accepted: boolean) => void }) {
  const [declines, setDeclines] = useState(0)
  const declineLabels = ['Отказаться', 'Точно? Даже без людей?', 'Ладно, отказаться']
  const decline = () => {
    if (declines < 2) setDeclines((value) => value + 1)
    else onDecision(false)
  }

  return (
    <section className="scene-content invitation-scene">
      <StatusPill tone="pink">{invitation.eyebrow}</StatusPill>
      <div className="invitation-title"><span>20</span><h1>{invitation.title}</h1><span>05</span></div>
      <GlassPanel className="invitation-card">
        <p>{invitation.lines[0]}</p>
        <strong>{invitation.lines[1]}<br />{invitation.lines[2]}</strong>
        <span className="location-secret">⌖ {invitation.secret}</span>
      </GlassPanel>
      <div className="decision-actions">
        <PrimaryButton onClick={() => onDecision(true)}>Принять задание 🖤</PrimaryButton>
        <motion.div animate={{ x: declines === 1 ? 20 : declines === 2 ? -12 : 0 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
          <SecondaryButton onClick={decline}>{declineLabels[declines]}</SecondaryButton>
        </motion.div>
      </div>
      <p className="consent-note">Любой ответ принимается системой без вопросов.</p>
    </section>
  )
}
