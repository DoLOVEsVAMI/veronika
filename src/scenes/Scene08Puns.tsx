import { useState } from 'react'
import { wordplayRiddles } from '../app/content'
import type { SceneProps } from '../app/types'
import { ChoiceRiddle, TextRiddle } from '../components/TextRiddle'
import { GlassPanel, SceneHeader } from '../components/UI'

export function Scene08Puns({ onNext, onAnswer }: SceneProps) {
  const [step, setStep] = useState(0)
  const proceed = () => step === 2 ? onNext() : setStep((current) => current + 1)

  return (
    <section className="scene-content">
      <SceneHeader eyebrow={`ЛИНГВОПРОТОКОЛ / ${step + 1}—3`} title="Каламбурный протокол" subtitle="Ввод слова, превращение и выбор финальной формулировки." />
      <GlassPanel>
        {step === 0 && <TextRiddle key="ghost-status" {...wordplayRiddles[0]} onAttempt={(value, correct) => onAnswer('ghost-status', value, correct)} onContinue={proceed} continueLabel="Открыть словесную мутацию" />}
        {step === 1 && <div className="word-mutation">
          <div className="mutation-display"><span>ТУМАН</span><b>→</b><span><i>?</i>ОМАН</span></div>
          <TextRiddle
            id="word-mutation"
            prompt="Замени одну букву и преврати любимую погоду в историю."
            accepted={['роман']}
            hints={['Меняется только первая буква.', 'Это может быть книга или история отношений.', 'Новая первая буква — «Р».']}
            success="ТУМАН превратился в РОМАН. Каламбур принят."
            placeholder="Получившееся слово"
            onAttempt={(value, correct) => onAnswer('word-mutation', value, correct)}
            onContinue={proceed}
            continueLabel="Открыть духовный вопрос"
          />
        </div>}
        {step === 2 && <ChoiceRiddle
          id="spirit-bond"
          prompt="Как призрак называет особенно близкие отношения?"
          choices={[
            { id: 'material', label: 'Материальные' },
            { id: 'official', label: 'Официально-паранормальные' },
            { id: 'spiritual', label: 'Духовные' },
            { id: 'transparent', label: 'Прозрачные' },
          ]}
          correctId="spiritual"
          success="Духовная связь подтверждена. Каламбур пережил проверку."
          failure="Почти, но ответ должен быть буквально связан с духами."
          onAttempt={(value, correct) => onAnswer('spirit-bond', value, correct)}
          onContinue={proceed}
          continueLabel="Завершить лингвопросмотр"
        />}
      </GlassPanel>
    </section>
  )
}
