import { useState } from "react"
import NoteDetails from "../../components/noteDetails/NoteDetails"
import Notelist from "../../components/notelist/Notelist"
import { INote } from "../../interfaces/note"
import { focusOptions } from '../../constants/noteDetails'
import { NoteDetailsStateContextProvider } from "./useNoteDetailsStateContext"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import { observer } from "mobx-react"
import NotebookStore from "../../store/NotebookStore"


const Notebook = observer(() => {
  const {
    currentNote, setCurrentNote,
    notebookCurrentFocus, setNotebookCurrentFocus,
    setCurrentNoteDetailsState
  } = NotebookStore
  const globalNavigationStore = GlobalNavigationStore
  const { isInGlobalMenu } = globalNavigationStore
  const { currentNotebookId } = NotebookStore
  const [noteList, setNoteList] = useState<INote[]>([])

  function handleCreateNewNote (newNote: INote) {
    //TODO: This needs to change, can't incrementally assign id, will cause error
    newNote.id = noteList.length + 1
    setNoteList(oldNoteList => [...oldNoteList, newNote])
    setCurrentNote(newNote)
  }
  function handleSelectNote (note: INote|null) {
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

  function handleTagsChange (tags: string[]) {
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
    }
  }

  function handleFinishEditDoc () {
    if (currentNote)
      console.log('save doc', currentNote.body)
  }

  function handleFinishEditTags () {
    if (currentNote) {
      console.log('save tags', currentNote.tags)
    }
  }

  function handleFinishEditTitle () {
    if (currentNote)
      console.log('save note', currentNote.title)
  }

  function handleEnterNotebook () {
    globalNavigationStore.setToPageNavigation()
    globalNavigationStore.focusNotebookPage()
  }
  function handleEnterElement (el: focusOptions) {
    setNotebookCurrentFocus(el)
  }
  const inactiveNodeListBorderColor = 'border-r-gray-500 border-l-transparent border-t-transparent border-b-transparent'
  return (
    <div className="grid grid-cols-10 h-full w-full relative" onMouseEnter={handleEnterNotebook}>
        <Notelist
          className={`${!isInGlobalMenu && currentNotebookId && notebookCurrentFocus === focusOptions.notelist ? 'border-blue-500' : inactiveNodeListBorderColor} col-span-3 border`}
          noteList={noteList}
          currentNote={currentNote}
          onCreateNewNote={handleCreateNewNote}
          onSelectNote={handleSelectNote}
          onMouseEnter={() => handleEnterElement(focusOptions.notelist)}
          onBlur={() => handleEnterElement(focusOptions.notedetails)}
          isActive={notebookCurrentFocus === focusOptions.notelist && !isInGlobalMenu}
        />
      <NoteDetailsStateContextProvider setCurrentNoteDetailsState={setCurrentNoteDetailsState}>
        <NoteDetails
          className={`${!isInGlobalMenu && currentNotebookId && notebookCurrentFocus === focusOptions.notedetails && currentNote ? 'border-blue-500' : 'border-transparent'} col-span-7 border`}
          currentNote={currentNote}
          onDocChange={handleDocChange}
          onFinishEditDoc={handleFinishEditDoc}
          onTitleChange={handleTitleChange}
          onFinishEditTitle={handleFinishEditTitle}
          onTagsChange={handleTagsChange}
          onFinishEditTags={handleFinishEditTags}
          onMouseEnter={() => handleEnterElement(focusOptions.notedetails)}
          isActive={notebookCurrentFocus === focusOptions.notedetails && !isInGlobalMenu}
          onBlur={() => handleEnterElement(focusOptions.notelist)}
        />
      </NoteDetailsStateContextProvider>
    </div>
  )
})

export default Notebook
