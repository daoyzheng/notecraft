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
    if (selectedItem.isFolder) {
      moveToNextItemWhenSelectedItemIsFolder() 
      return
    }
    moveToNextItemWhenSelectedItemIsNotFolder()
  }

  function moveToNextItemWhenSelectedItemIsFolder() {
    if (selectedItem!.expand) {
      setSelectedItem(selectedItem!.children[0])
      return
    }
    const folder = notebookListStore.getNotebookParent(notebookList, selectedItem!.id)
    if (!folder) {
      moveToNextRootItem()
      return
    }
    const selectedItemIndex = folder.children.findIndex(c => c.id === selectedItem!.id)
    if (selectedItemIndex !== folder.children.length - 1) {
      setSelectedItem(folder.children[selectedItemIndex+1])
      return
    }
  }

  function moveToNextItemWhenSelectedItemIsNotFolder() {
    const folder = notebookListStore.getNotebookParent(notebookList, selectedItem!.id)
    if (!folder) {
      moveToNextRootItem()
      return
    }
    const selectedItemIndex = folder.children.findIndex(c => c.id === selectedItem!.id)
    if (selectedItemIndex !== folder.children.length - 1) {
      setSelectedItem(folder.children[selectedItemIndex+1])
      return
    }
    const parentFolder = notebookListStore.getNotebookParent(notebookList, folder.id)
    if (!parentFolder) {
      moveToNextRootItem()
      return
    }
    const childItemIndex = parentFolder.children.findIndex(c => c.id === folder.id)
    if (childItemIndex !== parentFolder.children.length - 1) {
      setSelectedItem(parentFolder.children[selectedItemIndex+1])
      return
    }
  }

  function moveToNextRootItem() {
    const selectedItemIndex = notebookList.findIndex(n => n.id === selectedItem!.id)
    if (notebookList.length - 1 === selectedItemIndex) return
    setSelectedItem(notebookList[selectedItemIndex+1])
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
