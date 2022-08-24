import { action, makeObservable, observable } from "mobx"
import { menuOptions } from "../constants/globalMenu"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  currentSelectedPage: menuOptions = menuOptions.noteshall
  currentFocusedPage: menuOptions|null = null
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      currentSelectedPage: observable,
      currentFocusedPage: observable,
      setToMenuNavigation: action,
      setToPageNavigation: action,
      selectNotebookLandingPage: action,
      selectNotebookPage: action,
      selectNotehallPage: action,
      focusNotebookLandingPage: action,
      focusNotehallPage: action,
      focusNotebookPage: action
    })
  }
  setToMenuNavigation () {
    this.isInGlobalMenu = true
  }
  setToPageNavigation () {
    this.isInGlobalMenu = false
  }
  selectNotebookLandingPage = () => {
    this.currentSelectedPage = menuOptions.notebookLanding
  }
  selectNotehallPage = () => {
    this.currentSelectedPage = menuOptions.noteshall
  }
  selectNotebookPage = () => {
    this.currentSelectedPage = menuOptions.notebook
  }
  focusNotebookLandingPage = () => {
    this.currentFocusedPage = menuOptions.notebookLanding
  }
  focusNotehallPage = () => {
    this.currentFocusedPage = menuOptions.noteshall
  }
  focusNotebookPage = () => {
    this.currentFocusedPage = menuOptions.notebook
  }
}

export default new GlobalNavigationStore()