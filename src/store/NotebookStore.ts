import { action, makeObservable, observable } from "mobx"
import { focusOptions, possibleNoteDetailsStates } from "../constants/noteDetails"
import { INote, INotebook } from "../interfaces/note"

class NotebookStore {
  notebookCurrentFocus: focusOptions = focusOptions.notelist
  currentNoteDetailsState: possibleNoteDetailsStates = possibleNoteDetailsStates.navigating
  currentNote: INote|null = null

  constructor() {
    makeObservable(this, {
      notebookCurrentFocus: observable,
      currentNoteDetailsState: observable,
      currentNote: observable,
      setCurrentNote: action,
      setNotebookCurrentFocus: action,
      setCurrentNoteDetailsState: action,
      setCurrentNoteTitle: action,
      setCurrentNoteBody: action,
      setCurrentNoteTags: action
    })
  }
  setCurrentNote = (note: INote|null) => {
    this.currentNote = note
  }
  setCurrentNoteTitle = (title: string) => {
    if (this.currentNote)
      this.currentNote.title = title
  }
  setCurrentNoteBody = (body: string) => {
    if (this.currentNote)
      this.currentNote.body = body
  }
  setCurrentNoteTags = (tags: string[]) => {
    if (this.currentNote)
      this.currentNote.tags = tags
  }
  setNotebookCurrentFocus = (currentFocus: focusOptions) => {
    this.notebookCurrentFocus = currentFocus
  }
  setCurrentNoteDetailsState = (noteDetailsState: possibleNoteDetailsStates) => {
    this.currentNoteDetailsState = noteDetailsState
  }
}


export default new NotebookStore()
