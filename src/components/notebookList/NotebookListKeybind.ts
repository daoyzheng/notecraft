import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem } from "../../interfaces/note"
import routes from "../../routes"
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
  const { setCurrentFocusedPage, setToPageNavigation, currentFocusedPage, isInGlobalMenu } = globalNavigationStore
  const { setSelectedNotebook, replaceItem } = notebookListStore
  const navigate = useNavigate()
  const { itemId } = useParams()
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
        const firstItem = notebookList[0]
        if (currentItem?.id === firstItem.id) {
          setCurrentItem(null)
          setCurrentFocusedPage(menuOptions.notebookLanding)
          navigate(routes.notebooks)
          break
        }
        moveToPrevItem()
        break
      }
      case 'l':
      case 'enter':
      case 'arrowright': {
        if (!currentItem) break
        if (currentItem.isFolder) {
          const newItem = { ...currentItem, expand: !currentItem.expand }
          setCurrentItem(newItem)
          replaceItem(newItem)
          break
        } 
        setSelectedNotebook(currentItem)
        navigate(`${routes.notebooks}/${currentItem.id}`)
        if (itemId && currentItem.id === Number(itemId)) {
          setToPageNavigation()
          setCurrentFocusedPage(menuOptions.notebookList)
        }
        break
      }
      case 'h':
      case 'arrowleft': {
        if (!currentItem) break
        if (!currentItem.isFolder) break
        const newItem = { ...currentItem, expand: !currentItem.expand }
        setCurrentItem(newItem)
        replaceItem(newItem)
        break
      }
      case 'escape': {
        // setCurrentItem(null)
        // setCurrentFocusedPage(menuOptions.notebookLanding)
        // navigate(routes.notebooks)
        break
      }
    }
  }
  useEffect(() => {
    if (isInGlobalMenu && currentFocusedPage === menuOptions.notebookList) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentItem, notebookList, itemId, isInGlobalMenu])
}

export default useNotebookListKeybind
