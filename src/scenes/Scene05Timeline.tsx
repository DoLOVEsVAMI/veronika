import { timelineItems } from '../app/content'
import { SequencePuzzle } from '../components/Puzzles'
import { GlassPanel, SceneHeader } from '../components/UI'

export function Scene05Timeline({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene-content wide-content">
      <SceneHeader eyebrow="АРХИВ / 05" title="Восстановление событий" subtitle="Нажимай на фрагменты в правильном порядке. Установленный фрагмент можно вернуть назад." />
      <GlassPanel><SequencePuzzle items={timelineItems} onSolved={onNext} /></GlassPanel>
    </section>
  )
}
