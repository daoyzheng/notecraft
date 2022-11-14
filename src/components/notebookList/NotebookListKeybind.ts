import { useEffect } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import useNotebookListNavigation from "./useNotebookListNavigation"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  notebookListStore: typeof NotebookListStore
  notebookList: IDirectoryItem[]
  currentItem: IDirectoryItem | null
  setCurrentItem: (item: IDirectoryItem|null) => void
}
const useNotebookListKeybind = ({
  notebookListStore,
  globalNavigationStore,
  notebookList,
  currentItem,
  setCurrentItem
}: Props) => {
  const { moveToPrevItem, moveToNextItem } = useNotebookListNavigation({
    notebookListStore,
    notebookList,
    currentItem,
    setCurrentItem
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
    if (globalNavigationStore.isInGlobalMenu && globalNavigationStore.currentFocusedPage === menuOptions.notebookList) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentItem, notebookList])
}

export default useNotebookListKeybind
