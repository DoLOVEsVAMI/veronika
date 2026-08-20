import type { SceneProps } from '../app/types'
import { TextRiddle } from '../components/TextRiddle'
import { GlassPanel, SceneHeader } from '../components/UI'

export function Scene12Letters({ onNext, onAnswer }: SceneProps) {
  return (
    <section className="scene-content wide-content">
      <SceneHeader eyebrow="ДЕШИФРОВКА / 12" title="Скрытое назначение" subtitle="Восемь найденных символов относятся к одному событию. Теперь его нужно назвать самостоятельно." />
      <div className="cipher-strip" aria-label="Восемь зашифрованных символов">
        {['⌁', '◇', '⌖', '○', '×', '△', '□', '✦'].map((symbol, index) => <span key={`${symbol}-${index}`}>{symbol}</span>)}
      </div>
      <GlassPanel>
        <TextRiddle id="hidden-purpose" prompt="Встреча двух людей, после которой хочется встретиться ещё раз. Одно слово, восемь букв. Что скрывало дело?" accepted={['свидание', 'date']} hints={['Это уже не расследование, хотя всё ещё очень подозрительно.', 'Обычно на него приглашают того, кто нравится.', 'Начинается на «С», заканчивается на «Е».']} success="Кодовое слово принято: СВИДАНИЕ. Но дело ещё не завершено." placeholder="Восемь букв" onAttempt={(value, correct) => onAnswer('hidden-purpose', value, correct)} onContinue={onNext} continueLabel="Завершить расшифровку" />
      </GlassPanel>
    </section>
  )
}
