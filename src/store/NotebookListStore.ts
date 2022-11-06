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
    return getNotebookParentHelper(folder.children, id)
  }
  return null
}

export default new NotebookListStore()
