export type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

export type MusicStatus = 'checking' | 'ready' | 'playing' | 'paused' | 'unavailable'
export type FinalDecision = 'accepted' | 'declined' | null

export interface QuestState {
  scene: SceneNumber
  clues: string[]
  answers: Record<string, string>
  accessLevel: number
  errors: number
  musicStatus: MusicStatus
  finalDecision: FinalDecision
}

export interface Choice {
  id: string
  label: string
  emoji?: string
}

export interface QuizQuestion {
  id: string
  question: string
  choices: Choice[]
  correctId: string
  success: string
  failure: string
}

export interface TextRiddleContent {
  id: string
  prompt: string
  accepted: string[]
  hints: string[]
  success: string
  placeholder?: string
  inputMode?: 'text' | 'numeric'
}

export interface SceneProps {
  onNext: () => void
  onAnswer: (key: string, value: string, isCorrect?: boolean) => void
}

export interface PhotoClue {
  src: string
  label: string
  index: string
}
