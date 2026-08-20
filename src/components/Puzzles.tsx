import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { HIDDEN_WORD } from '../app/constants'
import { InlineFeedback, PrimaryButton, SecondaryButton } from './UI'

export function SequencePuzzle({ items, onSolved }: { items: string[]; onSolved: () => void }) {
  const initial = useMemo(() => [items[2], items[0], items[4], items[1], items[3]], [items])
  const [pool, setPool] = useState(initial)
  const [ordered, setOrdered] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)

  const add = (item: string) => {
    setWrong(false)
    setPool((value) => value.filter((candidate) => candidate !== item))
    setOrdered((value) => [...value, item])
  }

  const remove = (item: string) => {
    setWrong(false)
    setOrdered((value) => value.filter((candidate) => candidate !== item))
    setPool((value) => [...value, item])
  }

  const check = () => {
    if (ordered.every((item, index) => item === items[index]) && ordered.length === items.length - 1) onSolved()
    else setWrong(true)
  }

  return (
    <div className="puzzle-block">
      <div className="sequence-slots" aria-label="Собранная последовательность">
        {Array.from({ length: items.length }).map((_, index) => {
          const item = index === items.length - 1 ? '???' : ordered[index]
          return (
            <button key={index} type="button" className={`sequence-slot ${item ? 'filled' : ''}`} onClick={() => item && item !== '???' && remove(item)} disabled={!item || item === '???'}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item ?? 'Нажми улику'}
            </button>
          )
        })}
      </div>
      <div className="chip-pool">
        {pool.map((item) => <SecondaryButton key={item} onClick={() => add(item)}>{item}</SecondaryButton>)}
      </div>
      {wrong && <InlineFeedback success={false}>Хронология повреждена. Нажми на установленные карточки и попробуй ещё.</InlineFeedback>}
      <PrimaryButton onClick={check} disabled={ordered.length !== items.length - 1}>Восстановить события</PrimaryButton>
    </div>
  )
}

export function LetterPuzzle({ onSolved }: { onSolved: () => void }) {
  const letters = useMemo(() => ['И', 'С', 'Е', 'Д', 'В', 'И', 'Н', 'А'], [])
  const [available, setAvailable] = useState(letters.map((letter, index) => ({ letter, id: index })))
  const [placed, setPlaced] = useState<Array<{ letter: string; id: number }>>([])
  const [wrong, setWrong] = useState(false)

  const place = (id: number) => {
    const token = available.find((item) => item.id === id)
    if (!token) return
    setWrong(false)
    setAvailable((value) => value.filter((item) => item.id !== id))
    setPlaced((value) => [...value, token])
  }

  const undo = () => {
    const token = placed.at(-1)
    if (!token) return
    setWrong(false)
    setPlaced((value) => value.slice(0, -1))
    setAvailable((value) => [...value, token])
  }

  const check = () => {
    if (placed.map((item) => item.letter).join('') === HIDDEN_WORD) onSolved()
    else setWrong(true)
  }

  return (
    <div className="puzzle-block letter-puzzle">
      <div className="letter-slots" aria-label="Собранное слово">
        {letters.map((_, index) => (
          <motion.span layout key={index} className={placed[index] ? 'filled' : ''}>{placed[index]?.letter ?? '·'}</motion.span>
        ))}
      </div>
      <div className="letter-pool">
        {available.map(({ letter, id }) => <button type="button" key={id} onClick={() => place(id)}>{letter}</button>)}
      </div>
      <div className="puzzle-actions">
        <SecondaryButton onClick={undo} disabled={!placed.length}>Убрать букву</SecondaryButton>
        <PrimaryButton onClick={check} disabled={placed.length !== letters.length}>Расшифровать</PrimaryButton>
      </div>
      {wrong && <InlineFeedback success={false}>Порядок неверный. Подсказка: это то, на что может вести пятничная аномалия.</InlineFeedback>}
    </div>
  )
}
