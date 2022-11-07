import { Dispatch, SetStateAction } from "react"
import { IDirectoryItem } from "../../interfaces/note"
import NotebookListStore from "../../store/NotebookListStore"

interface Props {
  selectedItem: IDirectoryItem|null
  setSelectedItem: Dispatch<SetStateAction<IDirectoryItem|null>>
  notebookListStore: typeof NotebookListStore
  notebookList: IDirectoryItem[]
}
const useNotebookListNavigation = ({ notebookList, selectedItem, setSelectedItem, notebookListStore }: Props) => {
//*************** move to next item start ****************************
  function moveToNextItem() {
    if (!selectedItem) {
      setSelectedItem(notebookList[0])
      return
    }
    if (selectedItem.expand) {
      moveToNextExpandedItem()
      return
    }
    moveToNextNonExpandedItem()
  }

  function moveToNextExpandedItem() {
    if (selectedItem!.children.length > 0) {
      setSelectedItem(selectedItem!.children[0])
      return
    }
    moveToNextNonExpandedItem()
  }

  function moveToNextNonExpandedItem() {
    let currentItem = selectedItem!
    let folder = notebookListStore.getNotebookParent(notebookList, currentItem.id)
    while(folder) {
      const currentItemIndex = folder.children.findIndex(c => c.id === currentItem.id)
      if (currentItemIndex !== folder.children.length - 1) {
        setSelectedItem(folder.children[currentItemIndex+1])
        return
      }
      currentItem = folder
      folder = notebookListStore.getNotebookParent(notebookList, folder.id)
    }
    if (!folder) {
      moveToNextRootItem(currentItem)
      return
    }
  }

  function moveToNextRootItem(currentItem: IDirectoryItem) {
    const currentItemIndex = notebookList.findIndex(n => n.id === currentItem.id)
    if (notebookList.length - 1 === currentItemIndex) return
    setSelectedItem(notebookList[currentItemIndex+1])
  }
//*************** move to next item end ****************************


//*************** move to prev item start ****************************
  function moveToPrevRootItem(currentItem: IDirectoryItem) {
    const currentItemIndex = notebookList.findIndex(n => n.id === currentItem.id)
    if (currentItemIndex === 0) return
    let prevItem = notebookList[currentItemIndex-1]
    while (prevItem.expand) {
      const lastItemInPrevFolder = prevItem.children[prevItem.children.length - 1]
      if (lastItemInPrevFolder.expand) {
        prevItem = lastItemInPrevFolder
        continue
      }
      setSelectedItem(lastItemInPrevFolder)
      return
    }
    setSelectedItem(notebookList[currentItemIndex-1])
  }

  function moveToPrevItem () {
    if (!selectedItem) 
      return
    let folder = notebookListStore.getNotebookParent(notebookList, selectedItem.id)
    if (!folder) {
      moveToPrevRootItem(selectedItem)
      return
    }
    const selectedItemIndex = folder.children.findIndex(n => n.id === selectedItem.id)
    if (selectedItemIndex === 0) {
      setSelectedItem(folder)
      return
    }
    let prevItem = folder.children[selectedItemIndex-1]
    while (prevItem.expand) {
      const lastItemInPrevFolder = prevItem.children[prevItem.children.length - 1]
      if (lastItemInPrevFolder.expand) {
        prevItem = lastItemInPrevFolder
        continue
      }
      setSelectedItem(lastItemInPrevFolder)
      return
    }
    setSelectedItem(notebookList[selectedItemIndex-1])
  }

//*************** move to prev item end ****************************

  return {
    moveToNextItem,
    moveToPrevItem
  }
}

export default useNotebookListNavigation
