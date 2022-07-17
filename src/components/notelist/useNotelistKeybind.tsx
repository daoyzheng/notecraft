import { useEffect } from "react"
import { INote } from "../../interfaces/note"

interface Props {
  noteList: INote[]
  currentNote: INote | null
  isActive: boolean
  onSelectNote?: (note: INote|null) => void
}
const useNotelistKeybind = ({
  isActive,
  noteList,
  currentNote,
  onSelectNote
}: Props) => {
  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'arrowdown':
      case 'j': {
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[0])
        } else {
          const currentIndex = noteList.findIndex(note => note.id === currentNote.id)
          if (currentIndex < noteList.length - 1) {
            onSelectNote && onSelectNote(noteList[currentIndex + 1])
          } else {
            onSelectNote && onSelectNote(noteList[0])
          }
        }
        break
      }
      case 'arrowup':
      case 'k': {
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[noteList.length - 1])
        } else {
          const currentIndex = noteList.findIndex(note => note.id === currentNote.id)
          if (currentIndex > 0) {
            onSelectNote && onSelectNote(noteList[currentIndex - 1])
          } else {
            onSelectNote && onSelectNote(noteList[noteList.length - 1])
          }
        }
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
  }, [isActive, currentNote])
}

export default useNotelistKeybind