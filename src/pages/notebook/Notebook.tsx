import { useState } from "react"
import NoteDetails from "../../components/noteDetails/NoteDetails"
import Notelist from "../../components/notelist/Notelist"
import { INote } from "../../interfaces/note"

enum focusOptions {
  notelist,
  notedetails
}

const Notebook = () => {
  const [currentFocus, setCurrentFocus] = useState<focusOptions>(focusOptions.notelist)
  const [noteList, setNoteList] = useState<INote[]>([
    {
      id: 1,
      title: 'How to create markdown file How to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown file',
      createdAt: '2020-06-14',
      body: 'loremloremloremloremloremlor emloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      tags: ['new', 'hey', 'ho', 'here'],
      isPublic: true
    },
    {
      id: 2,
      title: 'How to create markdown file',
      createdAt: '2020-06-14',
      body: 'hey body',
      tags: ['new', 'hey', 'ho'],
      isPublic: false
    },
    {
      id: 3,
      title: 'How to create markdown file',
      createdAt: '2020-06-14',
      tags: [],
      isPublic: false
    },
    {
      id: 4,
      title: 'How to create markdown file',
      createdAt: '2020-06-14',
      tags: [],
      isPublic: true
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

  function handleFinishEditTags (tags: string[]) {
    if (currentNote) {
      currentNote.tags = tags
      setNoteList(oldNoteList => {
        return oldNoteList.map(note => {
          if (note.id === currentNote.id) {
            return { ...note, tags }
          }
          return note
        })
      })
      console.log('save tag', currentNote.tags)
    }
  }

  function handleFinishEditTitle () {
    if (currentNote)
      console.log('save note', currentNote.title)
  }
  function handleEnterElement (el: focusOptions) {
    setCurrentFocus(el)
  }
  const inactiveNodeListBorderColor = 'border-r-gray-500 border-l-transparent border-t-transparent border-b-transparent'
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist
        className={`${currentFocus === focusOptions.notelist ? 'border-blue-500' : inactiveNodeListBorderColor} col-span-3 border`}
        noteList={noteList}
        currentNote={currentNote}
        onCreateNewNote={handleCreateNewNote}
        onSelectNote={handleSelectNote}
        onMouseEnter={() => handleEnterElement(focusOptions.notelist)}
      />
      <NoteDetails
        className={`${currentFocus === focusOptions.notedetails && currentNote ? 'border-blue-500' : 'border-transparent'} col-span-7 border`}
        currentNote={currentNote}
        onDocChange={handleDocChange}
        onTitleChange={handleTitleChange}
        onFinishEditTitle={handleFinishEditTitle}
        onTagsChange={handleFinishEditTags}
        onMouseEnter={() => handleEnterElement(focusOptions.notedetails)}
      />
    </div>
  )
}

export default Notebook