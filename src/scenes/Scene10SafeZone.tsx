import { useState } from 'react'
import type { SceneProps } from '../app/types'
import { TextRiddle } from '../components/TextRiddle'
import { GlassPanel, PrimaryButton, SceneHeader } from '../components/UI'

const zoneEvidence = [
  { emoji: '🔇', label: 'Тишина' },
  { emoji: '🌫️', label: 'Туман' },
  { emoji: '❄️', label: 'Прохлада' },
  { emoji: '0', label: 'Людей' },
]

export function Scene10SafeZone({ onNext, onAnswer }: SceneProps) {
  const [solved, setSolved] = useState(false)
  return (
    <section className="scene-content wide-content">
      <SceneHeader eyebrow="ГЕОЛОКАЦИЯ / 10" title="Безопасная зона" subtitle="Система стёрла название места, но сохранила его параметры." />
      <div className="zone-evidence-grid">{zoneEvidence.map((item) => <div key={item.label}><span>{item.emoji}</span><small>{item.label}</small></div>)}</div>
      <GlassPanel>
        {!solved ? <TextRiddle id="safe-zone" prompt="Там прохладно, тихо и туманно, а количество людей стремится к нулю. Какое место ищет система?" accepted={['лес', 'тихий лес', 'парк', 'тихий парк', 'лес или парк', 'лесопарк']} hints={['Это точно не торговый центр и не пляж.', 'Там много деревьев.', 'Подойдут два ответа: «Л…» или «П…».']} success="Идеальная зона найдена. Координаты останутся секретными." placeholder="Название места" onAttempt={(value, correct) => onAnswer('safe-zone', value, correct)} onContinue={() => setSolved(true)} continueLabel="Зафиксировать зону" /> :
          <div className="safe-zone-result"><span>⌖</span><div><small>ИДЕАЛЬНАЯ ЗОНА</small><strong>ТУМАННЫЙ ТИХИЙ ЛЕС</strong><p>Людей: желательно 0 · Бубасиков: 1 · Меня: 1</p></div></div>}
      </GlassPanel>
      {solved && <PrimaryButton onClick={onNext}>Продолжить по скрытому маршруту</PrimaryButton>}
    </section>
  )
}
