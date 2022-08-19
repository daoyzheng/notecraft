import { action, makeObservable, observable } from "mobx"
import { menuFocusOptions } from "../constants/globalMenu"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  currentPage: menuFocusOptions = menuFocusOptions.notesnippet
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      currentPage: observable,
      setToMenuNavigation: action,
      setToPageNavigation: action,
      setToNotebookPage: action,
      setToNoteSnippetPage: action,
      setToNoteHallPage: action
    })
  }
  setToMenuNavigation () {
    this.isInGlobalMenu = true
  }
  setToPageNavigation () {
    this.isInGlobalMenu = false
  }
  setToNotebookPage () {
    this.currentPage = menuFocusOptions.notebooks
  }
  setToNoteSnippetPage () {
    this.currentPage = menuFocusOptions.notesnippet
  }
  setToNoteHallPage () {
    this.currentPage = menuFocusOptions.noteshall
  }
}

export default new GlobalNavigationStore()