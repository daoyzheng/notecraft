import { Dispatch, SetStateAction, useEffect } from "react"
import { UseFormReset } from "react-hook-form"
import { INote } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  noteList: INote[]
  currentNote: INote | null
  isActive: boolean
  showPopup: boolean
  notelistRef: React.RefObject<HTMLDivElement>
  globalNavigationStore: typeof GlobalNavigationStore
  onSelectNote?: (note: INote|null) => void
  setShowPopup: Dispatch<SetStateAction<boolean>>
  onBlur?: () => void
  reset: UseFormReset<INote>
}
const useNotelistKeybind = ({
  isActive,
  showPopup,
  noteList,
  currentNote,
  notelistRef,
  globalNavigationStore,
  onSelectNote,
  setShowPopup,
  onBlur,
  reset
}: Props) => {
  const offset = 0.8
  const segment = notelistRef.current && (notelistRef.current.scrollHeight / noteList.length * offset)
  function incrementNote () {
    const currentIndex = noteList.findIndex(note => note.id === currentNote!.id)
    if (currentIndex < noteList.length - 1) {
      onSelectNote && onSelectNote(noteList[currentIndex + 1])
      if (notelistRef.current) {
        notelistRef.current.scrollTop += segment ? segment : 0
      }
    } else {
      onSelectNote && onSelectNote(noteList[0])
      if (notelistRef.current)
        notelistRef.current.scrollTop = 0
    }
  }

  function decrementNote () {
    const currentIndex = noteList.findIndex(note => note.id === currentNote!.id)
    if (currentIndex > 0) {
      onSelectNote && onSelectNote(noteList[currentIndex - 1])
      if (notelistRef.current)
        notelistRef.current.scrollTop -= segment ? segment : 0
    } else {
      onSelectNote && onSelectNote(noteList[noteList.length - 1])
      if (notelistRef.current)
        notelistRef.current.scrollTop = notelistRef.current.scrollHeight
    }
  }
  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'arrowdown':
      case 'j': {
        if (showPopup) break
        e.preventDefault()
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[0])
        } else
          incrementNote()
        break
      }
      case 'arrowup':
      case 'k': {
        if (showPopup) break
        e.preventDefault()
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[noteList.length - 1])
        } else
          decrementNote()
        break
      }
      case 'enter':
      case 'arrowright':
      case 'l': {
        if (showPopup) break
        if (currentNote)
          onBlur && onBlur()
        break
      }
      case 'h':
      case 'arrowleft': {
        globalNavigationStore.setToGlobalNavigation()
        break
      }
      case 'i': {
        if (showPopup) break
        reset()
        setShowPopup(true)
        e.preventDefault()
        break
      }
      case 'escape': {
        if (showPopup)
          setShowPopup(false)
        break
      }
    }
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isActive, currentNote, showPopup])
}

export default useNotelistKeybind