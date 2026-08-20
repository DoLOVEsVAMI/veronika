import { useState } from 'react'
import type { SceneProps } from '../app/types'
import { GlassPanel, InlineFeedback, PrimaryButton, SceneHeader } from '../components/UI'

const faces = [
  { id: 'smile', face: '◕‿◕', label: 'Невинно улыбается' },
  { id: 'side', face: '◔_◔', label: 'Смотрит влево-вправо' },
  { id: 'cross', face: '◑‿◐', label: 'Сводит глаза наперекосяк' },
  { id: 'calm', face: '—‿—', label: 'Абсолютно спокойна' },
]

export function Scene07Reaction({ onNext, onAnswer }: SceneProps) {
  const [selected, setSelected] = useState<string[]>([])
  const complete = selected.includes('side') && selected.includes('cross')
  const toggle = (id: string) => {
    setSelected((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value, id])
    onAnswer('reaction', id, id === 'side' || id === 'cross')
  }

  return (
    <section className="scene-content">
      <SceneHeader eyebrow="БИОМЕТРИЯ / 07" title="Фирменная реакция" subtitle="Как выглядит объект, когда что-то подозревает? Выбери два совпадения." />
      <GlassPanel>
        <div className="face-grid">
          {faces.map((item) => (
            <button type="button" key={item.id} className={selected.includes(item.id) ? 'selected' : ''} onClick={() => toggle(item.id)}>
              <span>{item.face}</span><small>{item.label}</small>
            </button>
          ))}
        </div>
        {complete && <InlineFeedback success>Совпадение: 99.7%. Да. Я слишком хорошо тебя изучил.</InlineFeedback>}
      </GlassPanel>
      {complete && <PrimaryButton onClick={onNext}>Сохранить биометрию</PrimaryButton>}
    </section>
  )
}
