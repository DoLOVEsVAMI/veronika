import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GlassPanel, PrimaryButton } from '../components/UI'

export function Scene13FalseFinal({ onNext }: { onNext: () => void }) {
  const [error, setError] = useState(false)
  const close = () => {
    setError(true)
    window.setTimeout(onNext, 1800)
  }
  return (
    <section className="scene-content false-final">
      <AnimatePresence mode="wait">
        {!error ? (
          <motion.div key="done" className="center-stack" exit={{ opacity: 0, scale: 0.98 }}>
            <div className="completion-ring"><span>100</span><small>%</small></div>
            <p className="eyebrow">СИСТЕМНОЕ СООБЩЕНИЕ</p>
            <h1>Расследование<br />завершено</h1>
            <p className="subtitle">Все аномалии классифицированы.</p>
            <PrimaryButton onClick={close}>Закрыть дело</PrimaryButton>
          </motion.div>
        ) : (
          <motion.div key="error" className="center-stack error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassPanel><span className="error-icon">!</span><p className="eyebrow">ОШИБКА</p><h1>Обнаружена ещё одна аномалия</h1><div className="loading-dots"><i /><i /><i /></div></GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
