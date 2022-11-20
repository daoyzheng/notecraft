import { IDirectoryItem } from "../../interfaces/note"
import NotebookListStore from "../../store/NotebookListStore"

interface Props {
  currentItem: IDirectoryItem|null
  setCurrentItem: (item: IDirectoryItem|null) => void
  notebookListStore: typeof NotebookListStore
  notebookList: IDirectoryItem[]
}
const useNotebookListNavigation = ({
  notebookList,
  currentItem,
  setCurrentItem,
  notebookListStore
}: Props) => {
//*************** move to next item start ****************************
  function moveToNextItem() {
    if (!currentItem) {
      setCurrentItem(notebookList[0])
      return
    }
    if (currentItem.expand) {
      moveToNextExpandedItem()
      return
    }
    moveToNextNonExpandedItem()
  }

  function moveToNextExpandedItem() {
    if (currentItem!.children.length > 0) {
      setCurrentItem(currentItem!.children[0])
      return
    }
    moveToNextNonExpandedItem()
  }

  function moveToNextNonExpandedItem() {
    let selectedItem = currentItem!
    let folder = notebookListStore.getNotebookParent(notebookList, selectedItem.id)
    while(folder) {
      const currentItemIndex = folder.children.findIndex(c => c.id === selectedItem.id)
      if (currentItemIndex !== folder.children.length - 1) {
        setCurrentItem(folder.children[currentItemIndex+1])
        return
      }
      selectedItem = folder
      folder = notebookListStore.getNotebookParent(notebookList, folder.id)
    }
    if (!folder) {
      moveToNextRootItem(selectedItem)
      return
    }
  }

  function moveToNextRootItem(currentItem: IDirectoryItem) {
    const currentItemIndex = notebookList.findIndex(n => n.id === currentItem.id)
    if (notebookList.length - 1 === currentItemIndex) return
    setCurrentItem(notebookList[currentItemIndex+1])
  }
//*************** move to next item end ****************************


//*************** move to prev item start ****************************
  function moveToPrevRootItem(currentItem: IDirectoryItem) {
    const currentItemIndex = notebookList.findIndex(n => n.id === currentItem.id)
    if (currentItemIndex === 0) return
    let prevItem = notebookList[currentItemIndex-1]
    while (prevItem.expand) {
      if (prevItem.children.length === 0) {
        setCurrentItem(prevItem)
        return
      }
      const lastItemInPrevFolder = prevItem.children[prevItem.children.length - 1]
      if (lastItemInPrevFolder.expand) {
        prevItem = lastItemInPrevFolder
        continue
      }
      setCurrentItem(lastItemInPrevFolder)
      return
    }
    setCurrentItem(prevItem)
  }

  function moveToPrevItem () {
    if (!currentItem)
      return
    let folder = notebookListStore.getNotebookParent(notebookList, currentItem.id)
    if (!folder) {
      moveToPrevRootItem(currentItem)
      return
    }
    const selectedItemIndex = folder.children.findIndex(n => n.id === currentItem!.id)
    if (selectedItemIndex === 0) {
      setCurrentItem(folder)
      return
    }
    let prevItem = folder.children[selectedItemIndex-1]
    while (prevItem.expand) {
      if (prevItem.children.length === 0) {
        setCurrentItem(prevItem)
        return
      }
      const lastItemInPrevFolder = prevItem.children[prevItem.children.length - 1]
      if (lastItemInPrevFolder.expand) {
        prevItem = lastItemInPrevFolder
        continue
      }
      setCurrentItem(lastItemInPrevFolder)
      return
    }
    setCurrentItem(prevItem)
  }

//*************** move to prev item end ****************************

  return {
    moveToNextItem,
    moveToPrevItem
  }
}

export default useNotebookListNavigation
