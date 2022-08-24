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
      setCurrentFocusedPage: action,
      setCurrentSelectedPage: action
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
  setCurrentSelectedPage = (menu: menuOptions) => {
    this.currentSelectedPage = menu
  }
}

export default new GlobalNavigationStore()