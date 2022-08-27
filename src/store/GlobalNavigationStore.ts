import { action, makeObservable, observable } from "mobx"
import { menuOptions } from "../constants/globalMenu"
import { INotebook } from "../interfaces/note"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  currentFocusedPage: menuOptions|null = null
  currentRootNotebook: INotebook|null = null
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      currentFocusedPage: observable,
      currentRootNotebook: observable,
      setToMenuNavigation: action,
      setToPageNavigation: action,
      setCurrentFocusedPage: action,
      setCurrentRootNotebook: action,
    })
  }
  setToMenuNavigation () {
    this.isInGlobalMenu = true
  }
  setToPageNavigation () {
    this.isInGlobalMenu = false
  }
  setCurrentFocusedPage = (menu: menuOptions) => {
    this.currentFocusedPage = menu
  }
  setCurrentRootNotebook = (notebook: INotebook|null) => {
    this.currentRootNotebook = notebook
  }
}

export default new GlobalNavigationStore()