import { action, makeObservable, observable } from "mobx"
import NoteDetails from "../components/noteDetails/NoteDetails"
import { focusOptions, possibleNoteDetailsStates } from "../constants/noteDetails"
import { INote } from "../interfaces/note"

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
}

export default new NotebookStore()