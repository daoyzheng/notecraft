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
}: Props): {
  isShowChildren: boolean,
  notebookToExpand: INotebook|null,
  handleExpandChildren: (notebook: INotebook)=>void
} => {
  const [isShowChildren, setIsShowChildren] = useState<boolean>(false)
  const [notebookToExpand, setNotebookToExpand] = useState<INotebook|null>(null)
  function handleExpandChildren (notebook: INotebook) {
    console.log('lkjsd', notebook.name)
    console.log('expand', notebookToExpand?.name)
    if (notebookToExpand && notebook.parentNotebookId === notebookToExpand.id) return
    if (isShowChildren) {
      if (notebookToExpand?.id != notebook.id) {
        setNotebookToExpand(notebook)
        setIsShowChildren(true)
      } else {
        setNotebookToExpand(null)
        setIsShowChildren(false)
      }
    } else {
      setIsShowChildren(true)
      setNotebookToExpand(notebook)
    }
  }
  function handleKeyPress (e: KeyboardEvent) {
    if (!currentNotebook) return
    switch(e.key.toLocaleLowerCase()) {
      case 'e': {
        if (currentNotebook && currentNotebook.children.length > 0) {
          e.stopPropagation()
          handleExpandChildren(currentNotebook)
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
    notebookToExpand,
    isShowChildren,
    globalNavigationStore.isInGlobalMenu,
  ])
  return {
    isShowChildren,
    notebookToExpand,
    handleExpandChildren
  }
}

export default useNotebookListKeybind