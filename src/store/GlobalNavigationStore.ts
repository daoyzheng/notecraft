import { action, makeObservable, observable } from "mobx"
import { menuOptions } from "../constants/globalMenu"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  currentFocusedPage: menuOptions|null = null
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      currentFocusedPage: observable,
      setToMenuNavigation: action,
      setToPageNavigation: action,
      setCurrentFocusedPage: action
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
}

export default new GlobalNavigationStore()