import { action, makeObservable, observable } from "mobx"
import { focusOptions, possibleNoteDetailsStates } from "../constants/noteDetails"
import { INote } from "../interfaces/note"

class NotebookStore {
  notebookCurrentFocus: focusOptions = focusOptions.notelist
  currentNoteDetailsState: possibleNoteDetailsStates = possibleNoteDetailsStates.navigating
  currentNotebookId: number|null = null
  currentNote: INote|null = null

  constructor() {
    makeObservable(this, {
      notebookCurrentFocus: observable,
      currentNoteDetailsState: observable,
      currentNote: observable,
      currentNotebookId: observable,
      setCurrentNote: action,
      setNotebookCurrentFocus: action,
      setCurrentNoteDetailsState: action,
      setCurrentNoteTitle: action,
      setCurrentNoteBody: action,
      setCurrentNoteTags: action,
      setCurrentNotebookId: action
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
  setCurrentNotebookId = (notebookId: number|null) => {
    this.currentNotebookId = notebookId
  }
}

export default new NotebookStore()