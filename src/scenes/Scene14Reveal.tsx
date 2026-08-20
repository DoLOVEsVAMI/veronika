import { motion } from 'framer-motion'
import { PrimaryButton } from '../components/UI'

export function Scene14Reveal({ onNext }: { onNext: () => void }) {
  const lines = [
    'Кажется, дело вообще было не в аномалии.',
    'Мне просто хотелось сделать для тебя что-то странное, красивое и немного наше.',
    'Осталось одно последнее решение.',
  ]
  return (
    <section className="scene-content reveal-scene">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.65 } } }}>
        <motion.span className="romantic-symbol" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>✦</motion.span>
        {lines.map((line, index) => <motion.p key={line} className={index === 0 ? 'reveal-lead' : ''} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75 } } }}>{line}</motion.p>)}
      </motion.div>
      <PrimaryButton onClick={onNext}>Открыть последний протокол</PrimaryButton>
    </section>
  )
}
