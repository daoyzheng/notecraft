import { action, makeObservable, observable } from "mobx"

class GlobalNavigationStore {
  isInGlobalMenu: boolean = localStorage.getItem('isInGlobalMenu') ? localStorage.getItem('isInGlobalMenu') === 'true' ? true : false : true
  constructor() {
    makeObservable(this, {
      isInGlobalMenu: observable,
      setToGlobalNavigation: action,
      setToNotebookNavigation: action
    })
  }
  setToGlobalNavigation () {
    this.isInGlobalMenu = true
  }
  setToNotebookNavigation () {
    this.isInGlobalMenu = false
  }
}

export default new GlobalNavigationStore()