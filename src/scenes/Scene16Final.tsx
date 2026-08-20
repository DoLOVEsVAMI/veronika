import type { FinalDecision } from '../app/types'
import { invitation } from '../app/content'
import { GlassPanel, PrimaryButton, StatusPill } from '../components/UI'

export function Scene16Final({ decision, onRestart }: { decision: FinalDecision; onRestart: () => void }) {
  const accepted = decision === 'accepted'
  return (
    <section className="scene-content final-scene">
      <div className="final-mark">{accepted ? '♥' : '✦'}</div>
      <StatusPill tone={accepted ? 'pink' : 'neutral'}>{accepted ? 'CASE ACCEPTED' : 'CASE OPEN'}</StatusPill>
      <h1>{accepted ? 'Задание принято' : 'Решение принято'}</h1>
      <p className="subtitle">{accepted ? 'Пятничная аномалия официально подтверждена.' : 'Дело остаётся открытым. Никакого давления.'}</p>
      <GlassPanel className="final-details">
        {accepted ? (
          <dl>
            <div><dt>Когда</dt><dd>пятница вечером</dd></div>
            <div><dt>Где</dt><dd>узнаешь позже</dd></div>
            <div><dt>Что взять</dt><dd>себя</dd></div>
            <div><dt>Lipton</dt><dd>крайне приветствуется</dd></div>
            <div><dt>Люди</dt><dd>нежелательно</dd></div>
          </dl>
        ) : <p>Но Бубасик всё равно официально прекрасен. Архив сохранит это заключение.</p>}
      </GlassPanel>
      <p className="final-line">{accepted ? invitation.acceptedLine : 'Спасибо, что прошла это странное расследование 🖤'}</p>
      <PrimaryButton onClick={onRestart}>Пройти дело заново</PrimaryButton>
    </section>
  )
}
