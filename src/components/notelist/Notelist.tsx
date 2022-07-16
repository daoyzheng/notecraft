import { useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { INote } from '../../interfaces/note'
import NoteDisplay from '../noteDisplay/NoteDisplay'
interface Props {
  noteList: INote[],
  currentNote: INote|null,
  className?: string
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote) => void
}
const Notelist = ({ className, onCreateNewNote, onSelectNote, noteList, currentNote } : Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null)
  useOutsideAlerter({
    ref: popupRef,
    onClickOutside: handleClickOutside
  })
  function handleCreateNewNote () {
    const newNote = {
      id: 0,
      title: 'New Note',
      date: '2020-06-14',
      tags: [],
      isPrivate: true
    }
    onCreateNewNote && onCreateNewNote(newNote)
  }

  function handleClickOutside () {
    setShowPopup(false)
  }

  function handleSelectNote (note: INote) {
    if (note.id != currentNote?.id)
      onSelectNote && onSelectNote(note)
  }

  const popup = () => (
    <div ref={popupRef} className="bg-white rounded absolute text-black p-2 right-0">
      <input
        className="focus:outline-none"
        autoFocus
        placeholder="Title"
      />
      <div>Make note private</div>
      <div className="flex justify-end">
        <button>Create Note</button>
      </div>
    </div>
  )

  return (
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className}`}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <div className="cursor-pointer relative" onClick={() => setShowPopup(true)}>
          <i className="material-icons-outlined text-sm">launch</i>
          {
            showPopup && popup()
          }
        </div>
      </div>
      <div className="space-y-2">
        {
          noteList.map(note =>
            (
              <NoteDisplay key={note.id} note={note} onClick={handleSelectNote} className={`${currentNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
