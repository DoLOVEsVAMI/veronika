import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Choice } from '../app/types'
import { ChoiceCard, InlineFeedback, PrimaryButton, SecondaryButton } from './UI'

const normalizeAnswer = (value: string) => value
  .toLocaleLowerCase('ru-RU')
  .replaceAll('ё', 'е')
  .replace(/[^a-zа-я0-9]/gi, '')

interface TextRiddleProps {
  id: string
  prompt: string
  accepted: string[]
  hints: string[]
  success: string
  placeholder?: string
  inputMode?: 'text' | 'numeric'
  continueLabel?: string
  onAttempt?: (value: string, correct: boolean) => void
  onContinue: () => void
}

export function TextRiddle({
  id,
  prompt,
  accepted,
  hints,
  success,
  placeholder = 'Введи ответ…',
  inputMode = 'text',
  continueLabel = 'Продолжить расследование',
  onAttempt,
  onContinue,
}: TextRiddleProps) {
  const [value, setValue] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const correct = accepted.some((answer) => normalizeAnswer(answer) === normalizeAnswer(value))
    onAttempt?.(value, correct)
    if (correct) setSolved(true)
    else setAttempts((current) => current + 1)
  }

  const currentHint = attempts ? hints[Math.min(attempts - 1, hints.length - 1)] : null

  return (
    <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-riddle">
      <div className="riddle-number"><span>?</span><small>РУЧНАЯ ДЕШИФРОВКА</small></div>
      <p className="question-text">{prompt}</p>
      <form onSubmit={submit} className="answer-form">
        <label htmlFor={`answer-${id}`}>Ответ</label>
        <div className={`answer-field ${solved ? 'is-solved' : ''}`}>
          <input
            id={`answer-${id}`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            inputMode={inputMode}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={solved}
          />
          <span aria-hidden="true">{solved ? '✓' : '⌁'}</span>
        </div>
        {!solved && <PrimaryButton type="submit" disabled={!value.trim()}>Проверить ответ</PrimaryButton>}
      </form>
      {attempts > 0 && !solved && (
        <InlineFeedback success={false}>{currentHint}</InlineFeedback>
      )}
      {attempts >= 3 && !solved && (
        <SecondaryButton onClick={() => setValue(accepted[0])}>Восстановить ответ из архива</SecondaryButton>
      )}
      {solved && (
        <>
          <InlineFeedback success>{success}</InlineFeedback>
          <PrimaryButton onClick={onContinue}>{continueLabel}</PrimaryButton>
        </>
      )}
    </motion.div>
  )
}

interface ChoiceRiddleProps {
  id: string
  prompt: string
  choices: Choice[]
  correctId: string
  success: string
  failure: string
  continueLabel?: string
  onAttempt?: (value: string, correct: boolean) => void
  onContinue: () => void
}

export function ChoiceRiddle({
  id,
  prompt,
  choices,
  correctId,
  success,
  failure,
  continueLabel = 'Продолжить расследование',
  onAttempt,
  onContinue,
}: ChoiceRiddleProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const solved = selected === correctId

  const choose = (value: string) => {
    if (solved) return
    setSelected(value)
    onAttempt?.(value, value === correctId)
  }

  return (
    <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-riddle">
      <div className="riddle-number"><span>⌘</span><small>ВЫБОР ВЕРСИИ</small></div>
      <p className="question-text">{prompt}</p>
      <div className="choice-list">
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            label={choice.label}
            emoji={choice.emoji}
            selected={selected === choice.id}
            state={selected === choice.id ? (choice.id === correctId ? 'correct' : 'wrong') : 'idle'}
            onClick={() => choose(choice.id)}
          />
        ))}
      </div>
      {selected && <InlineFeedback success={solved}>{solved ? success : failure}</InlineFeedback>}
      {solved && <PrimaryButton onClick={onContinue}>{continueLabel}</PrimaryButton>}
    </motion.div>
  )
}
