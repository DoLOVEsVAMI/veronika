import { useState } from 'react'
import { caseInfo, originRiddles } from '../app/content'
import type { SceneProps } from '../app/types'
import { ChoiceRiddle, TextRiddle } from '../components/TextRiddle'
import { GlassPanel, SceneHeader } from '../components/UI'

export function Scene04Paranormal({ onNext, onAnswer }: SceneProps) {
  const [step, setStep] = useState(0)
  const proceed = () => step === 2 ? onNext() : setStep((current) => current + 1)

  return (
    <section className="scene-content">
      <SceneHeader eyebrow={`СИГНАЛ / ${step + 1}—3`} title="Паранормальная активность" subtitle="Восстанови платформу, расшифруй emoji-сигнал и вычисли дату." />
      <GlassPanel>
        {step === 0 && <TextRiddle key="origin-platform" {...originRiddles[0]} onAttempt={(value, correct) => onAnswer('origin-platform', value, correct)} onContinue={proceed} continueLabel="Открыть повреждённый сигнал" />}
        {step === 1 && <div className="rebus-block">
          <div className="emoji-rebus" aria-label="Игровой голосовой канал, призрак и видеокамера"><span>🎮</span><b>+</b><span>👻</span><b>+</b><span>📹</span></div>
          <ChoiceRiddle
            id="game-rebus"
            prompt="Какую игру передаёт этот повреждённый сигнал?"
            choices={[
              { id: 'dbd', label: 'Dead by Daylight' },
              { id: 'phasmo', label: 'Phasmophobia' },
              { id: 'outlast', label: 'Outlast' },
              { id: 'minecraft', label: 'Minecraft' },
            ]}
            correctId="phasmo"
            success="Emoji-сигнал расшифрован: Phasmophobia."
            failure="Сигнал не совпал. Здесь важны призрак и видеокамера."
            onAttempt={(value, correct) => onAnswer('origin-game', value, correct)}
            onContinue={proceed}
            continueLabel="Восстановить временную метку"
          />
        </div>}
        {step === 2 && <div className="date-lock">
          <div className="date-equation"><span>11 + 9</span><b>·</b><span>V месяц</span><b>·</b><span>2026</span></div>
          <TextRiddle key="origin-date" {...originRiddles[2]} prompt="Реши код выше и введи дату постоянного контакта в формате ДД.ММ.ГГГГ." onAttempt={(value, correct) => onAnswer('origin-date', value, correct)} onContinue={proceed} continueLabel="Восстановить хронологию" />
        </div>}
      </GlassPanel>
      {step > 0 && <GlassPanel className="signal-card">
        <div><small>ПЕРВИЧНАЯ АКТИВНОСТЬ</small><strong>{caseInfo.firstSignal}</strong></div>
        <div><small>СТАБИЛЬНЫЙ КОНТАКТ</small><strong>{step === 2 ? '••.05.2026' : '••.••.2026'}</strong></div>
      </GlassPanel>}
    </section>
  )
}
