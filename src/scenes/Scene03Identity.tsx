import { useState } from 'react'
import { identityRiddles } from '../app/content'
import type { SceneProps } from '../app/types'
import { ChoiceRiddle, TextRiddle } from '../components/TextRiddle'
import { GlassPanel, SceneHeader } from '../components/UI'

export function Scene03Identity({ onNext, onAnswer }: SceneProps) {
  const [step, setStep] = useState(0)
  const proceed = () => step === 2 ? onNext() : setStep((current) => current + 1)

  return (
    <section className="scene-content">
      <SceneHeader eyebrow={`ИДЕНТИФИКАЦИЯ / ${step + 1}—3`} title="Проверка личности" subtitle="Три протокола используют разные способы проверки." />
      <GlassPanel>
        <div className="decorative-progress"><span style={{ width: `${20 + step * 8.5}%` }} /></div>
        {step === 0 && <TextRiddle key="drink" {...identityRiddles[0]} onAttempt={(value, correct) => onAnswer('drink', value, correct)} onContinue={proceed} continueLabel="Открыть климатический тест" />}
        {step === 1 && <ChoiceRiddle
          id="habitat-choice"
          prompt="В какой среде объект с наибольшей вероятностью останется добровольно?"
          choices={[
            { id: 'beach', label: '+35°C, пляж и активное солнце', emoji: '☀️' },
            { id: 'mall', label: 'Торговый центр в субботу', emoji: '🛍️' },
            { id: 'fog', label: 'Холод, туман и минимум людей', emoji: '🌫️' },
            { id: 'office', label: 'Шумный офис open-space', emoji: '🗂️' },
          ]}
          correctId="fog"
          success="Климатический профиль совпал."
          failure="Слишком жарко или слишком много людей. Версия отклонена."
          onAttempt={(value, correct) => onAnswer('habitat', value, correct)}
          onContinue={proceed}
          continueLabel="Перейти к социальной проверке"
        />}
        {step === 2 && <TextRiddle key="crowd" {...identityRiddles[2]} onAttempt={(value, correct) => onAnswer('crowd', value, correct)} onContinue={proceed} continueLabel="Подтвердить личность · 37%" />}
      </GlassPanel>
    </section>
  )
}
