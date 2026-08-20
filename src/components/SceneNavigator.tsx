import { motion } from 'framer-motion'
import { SCENE_TITLES } from '../app/constants'
import type { SceneNumber } from '../app/types'

export function SceneNavigator({ current, onSelect, onClose }: { current: SceneNumber; onSelect: (scene: SceneNumber) => void; onClose: () => void }) {
  return (
    <motion.div className="scene-nav-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.section
        className="scene-navigator"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scene-navigator-title"
        initial={{ opacity: 0, y: 24, scale: .98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: .98 }}
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div><small>РЕЖИМ ПРОВЕРКИ</small><h2 id="scene-navigator-title">Перейти к этапу</h2></div>
          <button type="button" onClick={onClose} aria-label="Закрыть список этапов">×</button>
        </header>
        <div className="scene-nav-list">
          {SCENE_TITLES.map((title, index) => {
            const scene = (index + 1) as SceneNumber
            return (
              <button type="button" key={title} className={current === scene ? 'active' : ''} onClick={() => onSelect(scene)}>
                <span>{String(scene).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <i aria-hidden="true">→</i>
              </button>
            )
          })}
        </div>
        <p>Меню отображается только в локальном режиме разработки.</p>
      </motion.section>
    </motion.div>
  )
}
