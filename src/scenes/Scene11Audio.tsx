import type { MusicStatus } from '../app/types'
import { AudioClue } from '../components/AudioClue'
import { GlassPanel, PrimaryButton, SceneHeader } from '../components/UI'

export function Scene11Audio({ status, played, onPlay, onNext }: { status: MusicStatus; played: boolean; onPlay: () => void; onNext: () => void }) {
  return (
    <section className="scene-content">
      <SceneHeader eyebrow="АУДИО / 11" title="Запись, связанная с объектом" subtitle="В архиве обнаружен музыкальный отпечаток. Автовоспроизведение отключено." />
      <GlassPanel className="audio-panel">
        <AudioClue status={status} played={played} onPlay={onPlay} />
      </GlassPanel>
      <blockquote>«Ты в моих снах буквально каждый день»</blockquote>
      {(played || status === 'unavailable') && <PrimaryButton onClick={onNext}>Сохранить аудиоулику</PrimaryButton>}
    </section>
  )
}
