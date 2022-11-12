import { action, makeObservable, observable } from "mobx"
import { menuOptions } from "../constants/globalMenu"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  currentFocusedPage: menuOptions = menuOptions.noteshall
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      currentFocusedPage: observable,
      setToGlobalMenuNavigation: action,
      setToPageNavigation: action,
      setCurrentFocusedPage: action,
    })
  }
  setToGlobalMenuNavigation () {
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
