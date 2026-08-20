import { motion } from 'framer-motion'
import { caseInfo } from '../app/content'
import { PrimaryButton } from '../components/UI'

export function Scene01Boot({ onNext }: { onNext: () => void }) {
  return (
    <section className="boot-scene scene-content">
      <motion.div className="case-seal" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <span className="seal-mark">20<br />05</span>
        <span>CONFIDENTIAL</span>
      </motion.div>
      <motion.div className="boot-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.24 } } }}>
        {[caseInfo.caseName, caseInfo.archiveLabel, 'Обнаружена аномалия'].map((line, index) => (
          <motion.p key={line} className={index === 0 ? 'boot-title' : ''} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>{line}</motion.p>
        ))}
      </motion.div>
      <div className="boot-scan"><span /></div>
      <PrimaryButton onClick={onNext}>Открыть дело</PrimaryButton>
      <p className="system-footnote">SECURE CONNECTION · МОБИЛЬНЫЙ ДОСТУП</p>
    </section>
  )
}
