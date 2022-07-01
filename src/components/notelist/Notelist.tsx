import { useState } from 'react'
import { INote } from '../../interfaces/note'
import Note from '../note/Note'
interface Props {
  noteList: INote[],
  currentNote: INote|null,
  className?: string
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote) => void
}
const Notelist = ({ className, onCreateNewNote, onSelectNote, noteList, currentNote } : Props) => {
  function handleCreateNewNote () {
    const newNote = {
      id: 0,
      title: 'New Note',
      date: '2020-06-14'
    }
    onCreateNewNote && onCreateNewNote(newNote)
  }

  function handleSelectNote (note: INote) {
    if (note.id != currentNote?.id)
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
              <Note key={note.id} note={note} onClick={handleSelectNote} className={`${currentNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
