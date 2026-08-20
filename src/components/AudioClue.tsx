import type { MusicStatus } from '../app/types'
import { PrimaryButton } from './UI'

export function AudioClue({ status, played, onPlay }: { status: MusicStatus; played: boolean; onPlay: () => void }) {
  const unavailable = status === 'unavailable'
  const active = status === 'playing'

  return (
    <div className="audio-clue">
      <div className={`waveform ${active ? 'is-playing' : ''}`} aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ '--bar': `${24 + ((index * 17) % 62)}%` } as React.CSSProperties} />)}
      </div>
      <div className="audio-meta">
        <span>TRACK / K.A. / ARCHIVE</span>
        <strong>{unavailable ? 'Аудиоулика пока не загружена' : active ? 'Воспроизведение улики…' : 'Неизвестная запись'}</strong>
      </div>
      {!unavailable && <PrimaryButton onClick={onPlay}>{active ? '❚❚ Пауза' : '▶ Воспроизвести улику'}</PrimaryButton>}
      {unavailable && <p className="asset-note">Добавь файл <code>public/audio/track.mp3</code>. Сцену можно продолжить без него.</p>}
      {played && !unavailable && <p className="micro-copy">Музыкальный отпечаток сохранён ✓</p>}
    </div>
  )
}
