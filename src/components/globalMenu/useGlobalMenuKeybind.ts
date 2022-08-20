import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { menuFocusOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  currentFocus: menuFocusOptions
  notebookList: INotebook[]
  setCurrentFocus: Dispatch<SetStateAction<menuFocusOptions>>
}

const useGlobalMenuKeybind = ({
  globalNavigationStore,
  currentFocus,
  notebookList,
  setCurrentFocus
}: Props): {
  selectedNotebook: INotebook|null
  setSelectedNotebook: Dispatch<SetStateAction<INotebook|null>>
} => {
  const navigate = useNavigate()
  const [selectedNotebook, setSelectedNotebook] = useState<INotebook|null>(null)

  useEffect(() => {
    if (currentFocus != menuFocusOptions.notebookSelection) {
      navigate(getRouteFromFocus())
    }
  }, [currentFocus])

  function getRouteFromFocus() {
    switch(currentFocus) {
      case menuFocusOptions.notebooks: return routes.notebooks
      case menuFocusOptions.noteshall: return routes.noteshall
      default: return routes.noteshall
    }
  }

  function handleKeyPress (e: KeyboardEvent) {
    if (currentFocus != menuFocusOptions.notebookSelection) {
      switch(e.key.toLocaleLowerCase()) {
        case 'j':
        case 'arrowdown': {
          if (currentFocus === menuFocusOptions.notebooks) {
            break
          } else {
            setCurrentFocus(currentFocus+1)
          }
          break
        }
        case 'k':
        case 'arrowup': {
          if (currentFocus === menuFocusOptions.noteshall) {
            break
          } else {
            setCurrentFocus(currentFocus-1)
          }
          break
        }
        case 'l':
        case 'arrowright': {
          switch(currentFocus) {
            case menuFocusOptions.noteshall: {
              globalNavigationStore.setToNoteHallPage()
              globalNavigationStore.setToPageNavigation()
              break
            }
            case menuFocusOptions.notebooks: {
              globalNavigationStore.setToNotebookPage()
              globalNavigationStore.setToPageNavigation()
              break
            }
            default: break
          }
        }
        case 'enter': {
          if (menuFocusOptions.notebooks) {
            if (notebookList.length > 0) {
              setSelectedNotebook(notebookList[0])
              setCurrentFocus(menuFocusOptions.notebookSelection)
            }
          }
        }
      }
    } else {

    }
  }

  useEffect(() => {
    if (globalNavigationStore.isInGlobalMenu) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentFocus, globalNavigationStore.isInGlobalMenu])

  return {
    selectedNotebook,
    setSelectedNotebook
  }
}

export default useGlobalMenuKeybind