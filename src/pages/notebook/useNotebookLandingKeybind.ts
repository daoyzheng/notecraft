import { useEffect } from "react"
import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
}
const useNotebookLandingKeybind = ({
  globalNavigationStore
}: Props) => {
  const { currentFocusedPage, isInGlobalMenu, setToGlobalMenuNavigation } = globalNavigationStore
  useEffect(() => {
    function handleKeyPress (e: KeyboardEvent) {
      switch (e.key.toLocaleLowerCase()) {
        case 'h': {
          setToGlobalMenuNavigation()
          break
        }
      }
    }
    if (currentFocusedPage === menuOptions.notebookLanding && !isInGlobalMenu) {
      document.addEventListener('keypress', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [currentFocusedPage, isInGlobalMenu])
}

export default useNotebookLandingKeybind