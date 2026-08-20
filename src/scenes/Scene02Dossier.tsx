import { GlassPanel, PrimaryButton, SceneHeader, StatusPill } from '../components/UI'

export function Scene02Dossier({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene-content">
      <SceneHeader eyebrow="ФАЙЛ / 02" title="Объект обнаружен" subtitle="Для продолжения необходимо подтвердить личность объекта." />
      <GlassPanel className="dossier-card">
        <div className="dossier-top">
          <div className="avatar-placeholder"><span>?</span></div>
          <div><small>КОДОВОЕ ИМЯ</small><strong>••••••••</strong><StatusPill tone="pink">АКТИВЕН</StatusPill></div>
        </div>
        <dl className="data-list">
          <div><dt>Уровень угрозы</dt><dd>неизвестен</dd></div>
          <div><dt>Совместимость с обществом</dt><dd>ограниченная</dd></div>
          <div><dt>Милота</dt><dd>данные зашифрованы</dd></div>
          <div><dt>Последний сигнал</dt><dd>только что</dd></div>
        </dl>
      </GlassPanel>
      <PrimaryButton onClick={onNext}>Начать идентификацию</PrimaryButton>
    </section>
  )
}
