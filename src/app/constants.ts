import type { QuestState, SceneNumber } from './types'

export const TOTAL_SCENES = 16
// Повышайте версию после крупных изменений сценария, чтобы старый прогресс не пропускал новые сцены.
export const STORAGE_KEY = 'case-20-05-progress-v2'
export const HIDDEN_WORD = 'СВИДАНИЕ'

export const SCENE_TITLES = [
  'Загрузка архива',
  'Объект обнаружен',
  'Проверка личности',
  'Паранормальная активность',
  'Восстановление событий',
  'Фотоархив',
  'Фирменная реакция',
  'Каламбурный протокол',
  'Вампирский протокол',
  'Безопасная зона',
  'Аудиоулика',
  'Скрытое назначение',
  'Ложный финал',
  'Романтическое раскрытие',
  'Приглашение',
  'Финал',
] as const

export const INITIAL_STATE: QuestState = {
  scene: 1,
  clues: [],
  answers: {},
  accessLevel: 0,
  errors: 0,
  musicStatus: 'checking',
  finalDecision: null,
}

export const CLUE_BY_SCENE: Partial<Record<SceneNumber, string>> = {
  3: 'С',
  4: 'В',
  5: 'И',
  7: 'Д',
  8: 'А',
  9: 'Н',
  10: 'И',
  11: 'Е',
}

export const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
