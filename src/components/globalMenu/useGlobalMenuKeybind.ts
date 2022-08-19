import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { menuFocusOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  currentFocus: menuFocusOptions
  setCurrentFocus: Dispatch<SetStateAction<menuFocusOptions>>
}

const useGlobalMenuKeybind = ({
  globalNavigationStore,
  currentFocus,
  setCurrentFocus
}: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(getRouteFromFocus())
  }, [currentFocus])

  function getRouteFromFocus() {
    switch(currentFocus) {
      case menuFocusOptions.notebooks: return '/notebooks'
      case menuFocusOptions.noteshall: return '/noteshall'
      default: return '/notesnippet'
    }
  }

  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'j':
      case 'arrowdown': {
        if (currentFocus === menuFocusOptions.notebooks) {
          setCurrentFocus(menuFocusOptions.noteshall)
        } else {
          setCurrentFocus(currentFocus+1)
        }
        break
      }
      case 'k':
      case 'arrowup': {
        if (currentFocus === menuFocusOptions.noteshall) {
          setCurrentFocus(menuFocusOptions.notebooks)
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
}

export default useGlobalMenuKeybind