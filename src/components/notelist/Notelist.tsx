import { observer } from 'mobx-react'
import { MouseEvent, useCallback, useRef, useState } from 'react'
import { INote } from '../../interfaces/note'
import GlobalNavigationStore from '../../store/GlobalNavigationStore'
import NoteDisplay from '../noteDisplay/NoteDisplay'
import NewNoteForm from './NewNoteForm'
import { NotelistContainer } from './Notelist.styled'
import useNotelistKeybind from './useNotelistKeybind'
interface Props {
  noteList: INote[]
  currentNote: INote|null
  className?: string
  isActive: boolean
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote|null) => void
  onMouseEnter?: () => void
  onBlur?: () => void
}

const Notelist = observer(({
    className,
    noteList,
    currentNote,
    isActive,
    onCreateNewNote,
    onSelectNote,
    onMouseEnter,
    onBlur
  } : Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const notelistRef = useRef<HTMLDivElement>(null)
  const newNoteIconRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore

  useNotelistKeybind({
    isActive,
    showPopup,
    noteList,
    currentNote,
    notelistRef,
    globalNavigationStore,
    onSelectNote,
    setShowPopup,
    onBlur
  })
  function handleCreateNewNote (data: INote) {
    setShowPopup(false)
    onCreateNewNote && onCreateNewNote(data)
  }

  function handleNewNoteBlur () {
    setShowPopup(false)
  }

  function handleSelectNote (note: INote) {
    if (note.id != currentNote?.id) {
      onSelectNote && onSelectNote(note)
    }
  }

  function handleShowPopup () {
      setShowPopup(!showPopup)
  }

  const handleEnterNoteList = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  return (
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className} relative`} onMouseEnter={handleEnterNoteList}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <div className="relative flex items-center gap-x-1">
          <i className={`${showPopup ? 'text-blue-300' : ''} material-icons-outlined text-sm cursor-pointer`} onClick={handleShowPopup} ref={newNoteIconRef}>launch</i>
          {
            showPopup &&
            <NewNoteForm
              onBlur={handleNewNoteBlur}
              blurException={newNoteIconRef}
              onCreateNewNote={handleCreateNewNote}
            />
          }
        </div>
      </div>
      <NotelistContainer className="space-y-4" ref={notelistRef}>
        {
          noteList.map(note =>
            (
              <NoteDisplay key={note.id} note={note} onClick={handleSelectNote} className={`${currentNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </NotelistContainer>
    </div>
  )
})

export default Notelist
