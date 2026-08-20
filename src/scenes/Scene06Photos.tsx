import { photoClues } from '../app/content'
import { PhotoEvidence } from '../components/PhotoEvidence'
import { PrimaryButton, SceneHeader } from '../components/UI'

export function Scene06Photos({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene-content wide-content">
      <SceneHeader eyebrow="УЛИКИ / 06" title="Фотоархив" subtitle="Проведи по карточкам. В хранилище обнаружены подозрительно милые материалы." />
      <div className="photo-carousel">
        {photoClues.map((photo) => <PhotoEvidence key={photo.index} photo={photo} />)}
      </div>
      <div className="swipe-hint"><span>←</span> листай улики <span>→</span></div>
      <PrimaryButton onClick={onNext}>Зафиксировать наблюдения</PrimaryButton>
    </section>
  )
}
