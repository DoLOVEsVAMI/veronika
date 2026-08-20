import { useState } from 'react'
import type { PhotoClue } from '../app/types'
import { publicAsset } from '../app/constants'

export function PhotoEvidence({ photo }: { photo: PhotoClue }) {
  const [failed, setFailed] = useState(false)

  return (
    <article className="photo-evidence">
      <div className={`photo-frame ${failed ? 'is-placeholder' : ''}`}>
        {!failed && (
          <img
            src={publicAsset(photo.src)}
            alt={`Фото-улика ${photo.index}: ${photo.label}`}
            onError={() => setFailed(true)}
          />
        )}
        {failed && (
          <div className="photo-placeholder" aria-label="Фотография пока не добавлена">
            <span>✦</span>
            <small>АРХИВНЫЙ КАДР</small>
            <strong>{photo.index}</strong>
          </div>
        )}
        <span className="photo-stamp">EVIDENCE / {photo.index}</span>
      </div>
      <p>{photo.label}</p>
    </article>
  )
}
