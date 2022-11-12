import { action, makeObservable, observable } from "mobx";
import { IDirectoryItem } from "../interfaces/note";
import { notebookListMock } from "../utils/mock";

class NotebookListStore {
  notebookList: IDirectoryItem[] = notebookListMock
  constructor() {
    makeObservable(this, {
      notebookList: observable,
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
