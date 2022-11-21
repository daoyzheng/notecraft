import { useEffect } from "react"
import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
}
const useNoteHallKeybind = ({
  globalNavigationStore
}: Props) => {
  const { currentFocusedPage, isInGlobalMenu, setToGlobalMenuNavigation } = globalNavigationStore
  const handleKeyPress = (e: KeyboardEvent) => {
    switch(e.key.toLocaleLowerCase()) {
      case 'h': {
        setToGlobalMenuNavigation()
        break
      }
    }
  }
  useEffect(() => {
    if (currentFocusedPage === menuOptions.noteshall && !isInGlobalMenu) {
      document.addEventListener('keypress', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [currentFocusedPage, isInGlobalMenu])
}

export default useNoteHallKeybind