import { useState } from 'react'
import { INote } from '../../interfaces/note'
import Note from '../note/Note'
interface Props {
  className?: string
  onCreateNewNote?: () => void
  onSelectNote?: (note: INote) => void
}
const Notelist = ({ className, onCreateNewNote, onSelectNote } : Props) => {
  const [selectedNote, setSelectedNote] = useState<INote>()
  const [noteList, setNoteList] = useState<INote[]>([
    {
      id: 1,
      title: 'How to create markdown file',
      date: '2020-06-14',
      body: 'loremloremloremloremloremlor emloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem'
    },
    {
      id: 2,
      title: 'How to create markdown file',
      date: '2020-06-14'
    },
    {
      id: 3,
      title: 'How to create markdown file',
      date: '2020-06-14'
    },
    {
      id: 4,
      title: 'How to create markdown file',
      date: '2020-06-14'
    }
  ])
  function handleCreateNewNote () {
    const newNote = {
      id: noteList.length + 1,
      title: 'New Note',
      date: '2020-06-14'
    }
    setNoteList(oldNoteList => [...oldNoteList, newNote])
    onCreateNewNote && onCreateNewNote()
  }

  function handleSelectNote (note: INote) {
    setSelectedNote(note)
    onSelectNote && onSelectNote(note)
  }

  return (
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className}`}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <i className="material-icons-outlined text-sm cursor-pointer" onClick={handleCreateNewNote}>launch</i>
      </div>
      <div className="space-y-2">
        {
          noteList.map(note =>
            (
              <Note key={note.id} note={note} onClick={handleSelectNote} className={`${selectedNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
