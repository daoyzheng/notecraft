import { action, makeObservable, observable } from "mobx"
import { focusOptions, possibleNoteDetailsStates } from "../constants/noteDetails"
import { INote } from "../interfaces/note"

class NotebookStore {
  notebookCurrentFocus: focusOptions = focusOptions.notelist
  currentNoteDetailsState: possibleNoteDetailsStates = possibleNoteDetailsStates.navigating
  currentNotebookId: string|null = null
  currentNote: INote|null = null

  constructor() {
    makeObservable(this, {
      notebookCurrentFocus: observable,
      currentNoteDetailsState: observable,
      currentNote: observable,
      currentNotebookId: observable,
      setCurrentNote: action,
      setNotebookCurrentFocus: action,
      setCurrentNoteDetailsState: action
    })
  }
  setCurrentNote = (note: INote|null) => {
    this.currentNote = note
  }
  setNotebookCurrentFocus = (currentFocus: focusOptions) => {
    this.notebookCurrentFocus = currentFocus
  }
  setCurrentNoteDetailsState = (noteDetailsState: possibleNoteDetailsStates) => {
    this.currentNoteDetailsState = noteDetailsState
  }
  setCurrentNotebookId = (notebookId: string) => {
    this.currentNotebookId = notebookId
  }
}

export default new NotebookStore()