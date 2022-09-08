import { useEffect, useState } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  currentFocus: menuOptions
  currentNotebook: INotebook|null
}

const useNotebookListKeybind = ({
  globalNavigationStore,
  currentFocus,
  currentNotebook
}: Props) => {
  function handleKeyPress (e: KeyboardEvent) {
    if (!currentNotebook) return
    switch(e.key.toLocaleLowerCase()) {
      case 'e': {
        if (currentNotebook && currentNotebook.children.length > 0) {
          e.stopPropagation()
        }
        break
      }
    }
  }
  useEffect(() => {
    if (globalNavigationStore.isInGlobalMenu
      && currentFocus === menuOptions.notebook
      && currentNotebook) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [
    currentFocus,
    currentNotebook,
    globalNavigationStore.isInGlobalMenu,
  ])
}

export default useNotebookListKeybind