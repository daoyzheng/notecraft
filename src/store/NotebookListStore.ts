import { action, makeObservable, observable } from "mobx";
import { IDirectoryItem } from "../interfaces/note";
import { notebookListMock } from "../utils/mock";

class NotebookListStore {
  notebookList: IDirectoryItem[] = notebookListMock
  currentItem: IDirectoryItem|null = null
  constructor() {
    makeObservable(this, {
      notebookList: observable,
      currentItem: observable,
      setCurrentItem: action,
      getNotebookParent: action,
      getItem: action
    })
  }
  setCurrentItem = (item: IDirectoryItem|null) => {
    this.currentItem = item
  }
  getNotebookParent = (notebookList: IDirectoryItem[], id: number): null|IDirectoryItem => {
    return getNotebookParentHelper(notebookList, id)
  }
  getItem(notebookList: IDirectoryItem[], id: number): IDirectoryItem|null {
    return getItemHelper(notebookList, id)  
  }
}

function getItemHelper(items: IDirectoryItem[], id: number): IDirectoryItem|null {
  for (const item of items) {
    if (item.id === id) return item
    if (!item.children || item.children.length === 0) continue
    const foundItem = getItemHelper(item.children, id)
    if (foundItem) return foundItem
  }
  return null
}

function getNotebookParentHelper(items: IDirectoryItem[], id: number): IDirectoryItem|null {
  const folders = items.filter(item => item.isFolder)
  for (const folder of folders) {
    if (folder.children.some(c => c.id === id)) return folder
    const parent = getNotebookParentHelper(folder.children, id)
    if (parent) return parent
  }
  return null
}

export default new NotebookListStore()
