import { Dispatch, SetStateAction, useEffect } from "react"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import useNotebookListNavigation from "./useNotebookListNavigation"

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
  const { moveToPrevItem, moveToNextItem } = useNotebookListNavigation({
    notebookListStore,
    notebookList,
    selectedItem,
    setSelectedItem
  })
  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'arrowdown':
      case 'j': {
        if (notebookList.length === 0) return
        moveToNextItem()
        break
      }
      case 'arrowup':
      case 'k': {
        if (notebookList.length === 0) return
        moveToPrevItem()
        break
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
