import { useState } from 'react'
import type { SceneProps } from '../app/types'
import { TextRiddle } from '../components/TextRiddle'
import { GlassPanel, PrimaryButton, SceneHeader, StatusPill } from '../components/UI'

export function Scene09Vampire({ onNext, onAnswer }: SceneProps) {
  const [solved, setSolved] = useState(false)
  return (
    <section className="scene-content vampire-scene">
      <SceneHeader eyebrow="NOCTURNAL / 09" title="Вампирский протокол" subtitle="Подозрение: ночное происхождение." />
      <GlassPanel className="vampire-panel">
        <ul className="trait-list">
          {['Предпочитает чёрное', 'Избегает жары', 'Активна в позднее время', 'Притягивает взгляд', 'Связана с одной сущностью из DBD'].map((trait) => <li key={trait}><span>✦</span>{trait}</li>)}
        </ul>
        {!solved ? <div className="number-cipher">
          <div className="cipher-code"><span>2</span><i>·</i><span>21</span><i>·</i><span>2</span><i>·</i><span>1</span><i>·</i><span>19</span><i>·</i><span>10</span><i>·</i><span>12</span></div>
          <TextRiddle id="entity" prompt="Каждое число — номер буквы русского алфавита. Расшифруй кодовое имя сущности." accepted={['Бубасик', 'Bubasik']} hints={['Используй алфавит с буквой «Ё».', '2 — Б, 21 — У.', 'Получается ласковое кодовое имя из семи букв.']} success="Числовой шифр взломан." placeholder="Кодовое имя сущности" onAttempt={(value, correct) => onAnswer('entity', value, correct)} onContinue={() => setSolved(true)} continueLabel="Принять классификацию" />
        </div> :
          <div className="classification-result"><span>КЛАССИФИКАЦИЯ ОБНОВЛЕНА</span><strong>BUBASIK</strong><small>NOCTURNAL / CUTE / UNIQUE</small></div>}
      </GlassPanel>
      {solved && <><StatusPill tone="wine">ДОПУСК 74%</StatusPill><PrimaryButton onClick={onNext}>Открыть геолокацию</PrimaryButton></>}
    </section>
  )
}
