import { useEffect } from "react"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
}

const useGlobalMenuKeybind = ({
  globalNavigationStore
}: Props) => {
  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
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
  }, [])
}

export default useGlobalMenuKeybind