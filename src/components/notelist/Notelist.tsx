import { useState } from 'react'
import { INote } from '../../interfaces/note'
import Note from '../note/Note'
interface Props {
  className?: string
  onCreateNewNote: () => void
}
const Notelist = ({ className, onCreateNewNote } : Props) => {
  const [selectedNote, setSelectedNote] = useState<INote>()
  const [noteList, setNoteList] = useState<INote[]>([
    {
      id: 1,
      title: 'How to create markdown file',
      date: '2020-06-14',
      body: 'testing note here'
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
    onCreateNewNote()
  }

  function handleClick () {
    console.log('her')
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
              <Note key={note.id} note={note}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
