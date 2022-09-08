import { action, makeObservable, observable } from "mobx"
import { focusOptions, possibleNoteDetailsStates } from "../constants/noteDetails"
import { INote, INotebook } from "../interfaces/note"
import { notebooksMock } from "../utils/mock"

class NotebookStore {
  notebookCurrentFocus: focusOptions = focusOptions.notelist
  currentNoteDetailsState: possibleNoteDetailsStates = possibleNoteDetailsStates.navigating
  allNotebooks: INotebook[] = notebooksMock
  currentNotebook: INotebook|null = null
  currentNote: INote|null = null

  constructor() {
    makeObservable(this, {
      notebookCurrentFocus: observable,
      currentNoteDetailsState: observable,
      currentNote: observable,
      allNotebooks: observable,
      currentNotebook: observable,
      setCurrentNote: action,
      setNotebookCurrentFocus: action,
      setCurrentNoteDetailsState: action,
      setCurrentNoteTitle: action,
      setCurrentNoteBody: action,
      setCurrentNoteTags: action,
      setCurrentNotebook: action,
      updateNotebook: action,
      updateCurrentNotebook: action
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
  setCurrentNotebook = (notebook: INotebook|null) => {
    this.currentNotebook = notebook
  }
  updateCurrentNotebook = (newCurrentNotebook: INotebook) => {
    this.currentNotebook = newCurrentNotebook
  }
  updateNotebook = (newNotebook: INotebook) => {
    let parentNotebook = null
    for (const notebook of this.allNotebooks) {
      parentNotebook = getParentNotebook(notebook, newNotebook.parentNotebookId)
      if (parentNotebook)
        break
    }
    if (!parentNotebook) {
      const index = this.allNotebooks.findIndex(notebook => notebook.id === newNotebook.id)
      this.allNotebooks[index] = newNotebook
    } else {
      const index = parentNotebook.children.findIndex(notebook => notebook.id === newNotebook.id)
      parentNotebook.children[index] = newNotebook
    }
  }
}

function getParentNotebook(notebook: INotebook, parentNotebookId: number|null): INotebook|null {
  if (!parentNotebookId) return null
  if (notebook.id === parentNotebookId) return notebook
  let parentNotebook = null
  for (const child of notebook.children) {
    parentNotebook = getParentNotebook(child, parentNotebookId)
    if (parentNotebook) return parentNotebook
  }
  return null
}

export default new NotebookStore()