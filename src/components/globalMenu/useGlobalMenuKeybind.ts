import { Dispatch, SetStateAction, useEffect } from "react"
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
  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'j':
      case 'arrowdown': {
        if (currentFocus === menuFocusOptions.notebooks) {
          setCurrentFocus(menuFocusOptions.notesnippet)
        } else {
          setCurrentFocus(currentFocus+1)
        }
        break
      }
      case 'k':
      case 'arrowup': {
        if (currentFocus === menuFocusOptions.notesnippet) {
          setCurrentFocus(menuFocusOptions.notebooks)
        } else {
          setCurrentFocus(currentFocus-1)
        }
        break
      }
      case 'l':
      case 'arrowright': {
        globalNavigationStore.setToNotebookNavigation()
        break
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