import { useState } from "react"
import NoteDetails from "../../components/noteDetails/NoteDetails"
import Notelist from "../../components/notelist/Notelist"
import { INote } from "../../interfaces/note"

const Notebook = () => {
  const [noteList, setNoteList] = useState<INote[]>([
    {
      id: 1,
      title: 'How to create markdown file How to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown file',
      date: '2020-06-14',
      body: 'loremloremloremloremloremlor emloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      tags: ['new', 'hey', 'ho']
    },
    {
      id: 2,
      title: 'How to create markdown file',
      date: '2020-06-14',
      body: 'hey body',
      tags: ['new', 'hey', 'ho']
    },
    {
      id: 3,
      title: 'How to create markdown file',
      date: '2020-06-14',
      tags: []
    },
    {
      id: 4,
      title: 'How to create markdown file',
      date: '2020-06-14',
      tags: []
    }
  ])
  const [currentNote, setCurrentNote] = useState<INote|null>(null)

  function handleCreateNewNote (newNote: INote) {
    newNote.id = noteList.length + 1
    setNoteList(oldNoteList => [...oldNoteList, newNote])
    setCurrentNote(newNote)
  }
  function handleSelectNote (note: INote) {
    setCurrentNote(note)
  }

  function handleDocChange (doc: string) {
    if (currentNote) {
      currentNote.body = doc
      setCurrentNote(currentNote)
      setNoteList(oldNoteList => {
        return oldNoteList.map(note => {
          if (note.id === currentNote.id) {
            return { ...note, body: doc}
          }
          return note
        })
      })
    }
  }

  function handleTitleChange (title: string) {
    if (currentNote) {
      currentNote.title = title
      setCurrentNote(currentNote)
      setNoteList(oldNoteList => {
        return oldNoteList.map(note => {
          if (note.id === currentNote.id) {
            return { ...note, title }
          }
          return note
        })
      })
    }
  }

  function handleFinishEditTitle () {
    console.log('save note')
  }
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist
        className="col-span-3 border-r border-gray-500"
        noteList={noteList}
        currentNote={currentNote}
        onCreateNewNote={handleCreateNewNote}
        onSelectNote={handleSelectNote}
      />
      <NoteDetails className="col-span-7"
        currentNote={currentNote}
        onDocChange={handleDocChange}
        onTitleChange={handleTitleChange}
        onFinishEditTitle={handleFinishEditTitle}
      />
    </div>
  )
}

export default Notebook