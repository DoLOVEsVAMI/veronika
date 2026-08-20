import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CLUE_BY_SCENE, INITIAL_STATE, STORAGE_KEY, TOTAL_SCENES, publicAsset } from './constants'
import { caseInfo } from './content'
import type { FinalDecision, QuestState, SceneNumber } from './types'
import { EvidenceToast, SceneShell } from '../components/Ambience'
import { ProgressHint } from '../components/UI'
import { SceneNavigator } from '../components/SceneNavigator'
import { Scene01Boot } from '../scenes/Scene01Boot'
import { Scene02Dossier } from '../scenes/Scene02Dossier'
import { Scene03Identity } from '../scenes/Scene03Identity'
import { Scene04Paranormal } from '../scenes/Scene04Paranormal'
import { Scene05Timeline } from '../scenes/Scene05Timeline'
import { Scene06Photos } from '../scenes/Scene06Photos'
import { Scene07Reaction } from '../scenes/Scene07Reaction'
import { Scene08Puns } from '../scenes/Scene08Puns'
import { Scene09Vampire } from '../scenes/Scene09Vampire'
import { Scene10SafeZone } from '../scenes/Scene10SafeZone'
import { Scene11Audio } from '../scenes/Scene11Audio'
import { Scene12Letters } from '../scenes/Scene12Letters'
import { Scene13FalseFinal } from '../scenes/Scene13FalseFinal'
import { Scene14Reveal } from '../scenes/Scene14Reveal'
import { Scene15Invitation } from '../scenes/Scene15Invitation'
import { Scene16Final } from '../scenes/Scene16Final'

function restoreState(): QuestState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_STATE
    const saved = JSON.parse(raw) as Partial<QuestState>
    if (!saved.scene || saved.scene < 1 || saved.scene > TOTAL_SCENES) return INITIAL_STATE
    return {
      ...INITIAL_STATE,
      ...saved,
      musicStatus: 'checking',
      clues: Array.isArray(saved.clues) ? saved.clues : [],
      answers: saved.answers && typeof saved.answers === 'object' ? saved.answers : {},
    }
  } catch {
    return INITIAL_STATE
  }
}

export default function App() {
  const [state, setState] = useState<QuestState>(restoreState)
  const [toastLetter, setToastLetter] = useState<string | null>(null)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.scene])

  const answer = (key: string, value: string, isCorrect = true) => {
    setState((current) => ({
      ...current,
      answers: { ...current.answers, [key]: value },
      errors: current.errors + (isCorrect ? 0 : 1),
    }))
  }

  const next = () => {
    const letter = CLUE_BY_SCENE[state.scene]
    if (letter && !state.clues.includes(letter + state.scene)) {
      setToastLetter(letter)
      window.setTimeout(() => setToastLetter(null), 2200)
    }
    setState((current) => {
      const clueKey = letter ? `${letter}${current.scene}` : null
      return {
        ...current,
        scene: Math.min(TOTAL_SCENES, current.scene + 1) as SceneNumber,
        clues: clueKey && !current.clues.includes(clueKey) ? [...current.clues, clueKey] : current.clues,
        accessLevel: Math.min(100, current.accessLevel + 7),
      }
    })
  }

  const decide = (accepted: boolean) => {
    setState((current) => ({
      ...current,
      finalDecision: (accepted ? 'accepted' : 'declined') as FinalDecision,
      scene: 16,
      accessLevel: 100,
    }))
  }

  const goToScene = (scene: SceneNumber) => {
    setState((current) => ({
      ...current,
      scene,
      finalDecision: scene === 16 ? (current.finalDecision ?? 'accepted') : current.finalDecision,
    }))
    setNavigatorOpen(false)
  }

  const restart = () => {
    audioRef.current?.pause()
    localStorage.removeItem(STORAGE_KEY)
    setAudioPlayed(false)
    setState({ ...INITIAL_STATE })
  }

  const playAudio = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (audio.paused) {
        await audio.play()
        setAudioPlayed(true)
        setState((current) => ({ ...current, musicStatus: 'playing' }))
      } else {
        audio.pause()
        setState((current) => ({ ...current, musicStatus: 'paused' }))
      }
    } catch {
      setState((current) => ({ ...current, musicStatus: 'unavailable' }))
    }
  }

  const renderScene = () => {
    const props = { onNext: next, onAnswer: answer }
    switch (state.scene) {
      case 1: return <Scene01Boot onNext={next} />
      case 2: return <Scene02Dossier onNext={next} />
      case 3: return <Scene03Identity {...props} />
      case 4: return <Scene04Paranormal {...props} />
      case 5: return <Scene05Timeline onNext={next} />
      case 6: return <Scene06Photos onNext={next} />
      case 7: return <Scene07Reaction {...props} />
      case 8: return <Scene08Puns {...props} />
      case 9: return <Scene09Vampire {...props} />
      case 10: return <Scene10SafeZone {...props} />
      case 11: return <Scene11Audio status={state.musicStatus} played={audioPlayed} onPlay={playAudio} onNext={next} />
      case 12: return <Scene12Letters {...props} />
      case 13: return <Scene13FalseFinal onNext={next} />
      case 14: return <Scene14Reveal onNext={next} />
      case 15: return <Scene15Invitation onDecision={decide} />
      case 16: return <Scene16Final decision={state.finalDecision} onRestart={restart} />
    }
  }

  return (
    <SceneShell scene={state.scene}>
      <audio
        ref={audioRef}
        src={publicAsset(caseInfo.audioTrack)}
        preload="metadata"
        onCanPlay={() => setState((current) => ({ ...current, musicStatus: current.musicStatus === 'playing' ? 'playing' : 'ready' }))}
        onError={() => setState((current) => ({ ...current, musicStatus: 'unavailable' }))}
        onEnded={() => setState((current) => ({ ...current, musicStatus: 'paused' }))}
      />
      {state.scene > 1 && state.scene < 16 && (
        <div className="top-controls">
          <button type="button" className="reset-button" onClick={() => window.confirm('Начать расследование заново?') && restart()} aria-label="Начать заново">↺</button>
          <ProgressHint scene={state.scene} total={TOTAL_SCENES} />
          {state.musicStatus !== 'unavailable' && state.musicStatus !== 'checking' ? (
            <button type="button" className="sound-button" onClick={playAudio} aria-label={state.musicStatus === 'playing' ? 'Поставить музыку на паузу' : 'Включить музыку'}>
              {state.musicStatus === 'playing' ? '🔊' : '🔇'}
            </button>
          ) : <span className="control-spacer" />}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.scene}
          className="scene-motion-wrap"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>{toastLetter && <EvidenceToast letter={toastLetter} />}</AnimatePresence>
      {import.meta.env.DEV && (
        <button type="button" className="scene-map-trigger" onClick={() => setNavigatorOpen(true)} aria-label="Открыть список этапов">
          <span>☷</span> Этапы
        </button>
      )}
      <AnimatePresence>{navigatorOpen && <SceneNavigator current={state.scene} onSelect={goToScene} onClose={() => setNavigatorOpen(false)} />}</AnimatePresence>
    </SceneShell>
  )
}
