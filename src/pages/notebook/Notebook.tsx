import { useState } from "react"
import NoteDetails from "../../components/noteDetails/NoteDetails"
import Notelist from "../../components/notelist/Notelist"
import { INote } from "../../interfaces/note"

const Notebook = () => {
  const [currentNote, setCurrentNote] = useState<INote|null>(null)
  function handleCreateNewNote () {
    console.log('create new')
  }
  function handleSelectNote (note: INote) {
    setCurrentNote(note)
  }
  function handleNoteChange (doc: string) {
    if (currentNote) {
      currentNote.body = doc
      setCurrentNote(currentNote)
    }
  }
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist
        className="col-span-3 border-r border-gray-500"
        onCreateNewNote={handleCreateNewNote}
        onSelectNote={handleSelectNote}
      />
      <NoteDetails className="col-span-7"
        note={currentNote}
        onDocChange={handleNoteChange}
      />
    </div>
  )
}

export default Notebook