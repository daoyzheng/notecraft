import { action, makeObservable } from "mobx";
import { IDirectoryItem } from "../interfaces/note";

class NotebookListStore {
  constructor() {
    makeObservable(this, {
      getNotebookParent: action
    })
  }
  getNotebookParent(notebookList: IDirectoryItem[], id: number): null|IDirectoryItem {
    return getNotebookParentHelper(notebookList, id)
  }
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
