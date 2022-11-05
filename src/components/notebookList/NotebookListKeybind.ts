import { useEffect } from "react"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  isActive: boolean
}
const useNotebookListKeybind = ({
  globalNavigationStore,
  isActive
}: Props) => {
  function handleKeyPress (e: KeyboardEvent) {
    console.log('dirTreeEvent', e.key)
  }
  useEffect(() => {
    if (isActive && globalNavigationStore.isInGlobalMenu) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })
}

export default useNotebookListKeybind
