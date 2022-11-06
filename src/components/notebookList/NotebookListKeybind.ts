import { Dispatch, SetStateAction, useEffect } from "react"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  notebookListStore: typeof NotebookListStore
  isActive: boolean
  notebookList: IDirectoryItem[]
  selectedItem: IDirectoryItem | null
  setSelectedItem: Dispatch<SetStateAction<IDirectoryItem|null>>
}
const useNotebookListKeybind = ({
  notebookListStore,
  globalNavigationStore,
  isActive,
  notebookList,
  selectedItem,
  setSelectedItem
}: Props) => {
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


  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'arrowdown':
      case 'j': {
        if (notebookList.length === 0) return
        moveToNextItem()
      }
    }
  }
  useEffect(() => {
    if (isActive && globalNavigationStore.isInGlobalMenu) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedItem, notebookList])
}

export default useNotebookListKeybind
