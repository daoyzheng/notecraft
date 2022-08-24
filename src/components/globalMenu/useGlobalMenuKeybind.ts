import { Dispatch, RefObject, SetStateAction, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  currentFocus: menuOptions
  notebookList: INotebook[]
  notebookListRef: RefObject<HTMLDivElement>
  setCurrentFocus: Dispatch<SetStateAction<menuOptions>>
}

const useGlobalMenuKeybind = ({
  globalNavigationStore,
  currentFocus,
  notebookList,
  notebookListRef,
  setCurrentFocus
}: Props) => {
  const navigate = useNavigate()
  const { currentNotebookId, setCurrentNotebookId } = NotebookStore

  const offset = 0.8
  const segment = notebookListRef.current && (notebookListRef.current.scrollHeight / notebookList.length * offset)
  function incrementNotebook () {
    const currentIndex = notebookList.findIndex(notebook => notebook.id === currentNotebookId)
    if (currentIndex < notebookList.length - 1) {
      setCurrentNotebookId(notebookList[currentIndex + 1].id!)
      if (notebookListRef.current) {
        notebookListRef.current.scrollTop += segment ? segment : 0
      }
    } else {
      setCurrentNotebookId(notebookList[0].id!)
      if (notebookListRef.current)
        notebookListRef.current.scrollTop = 0
    }
  }

  function decrementNotebook () {
    const currentIndex = notebookList.findIndex(notebook => notebook.id === currentNotebookId)
    if (currentIndex > 0) {
      setCurrentNotebookId(notebookList[currentIndex - 1].id!)
      if (notebookListRef.current)
        notebookListRef.current.scrollTop -= segment ? segment : 0
    } else {
      setCurrentNotebookId(notebookList[notebookList.length - 1].id!)
      if (notebookListRef.current)
        notebookListRef.current.scrollTop = notebookListRef.current.scrollHeight
    }

  }


  function getRouteFromFocus (focus: menuOptions) {
    switch(focus) {
      case menuOptions.notebookLanding: return routes.notebooks
      case menuOptions.noteshall: return routes.noteshall
      default: return routes.noteshall
    }
  }

  function handleKeyPress (e: KeyboardEvent) {
    if (currentFocus !== menuOptions.notebook) {
      switch(e.key.toLocaleLowerCase()) {
        case 'j':
        case 'arrowdown': {
          if (currentFocus !== menuOptions.notebookLanding) {
            setCurrentFocus(currentFocus+1)
            navigate(getRouteFromFocus(currentFocus+1))
          }
          break
        }
        case 'k':
        case 'arrowup': {
          if (currentFocus !== menuOptions.noteshall) {
            setCurrentFocus(currentFocus-1)
            navigate(getRouteFromFocus(currentFocus-1))
          }
          break
        }
        case 'l':
        case 'arrowright': {
          switch(currentFocus) {
            case menuOptions.noteshall: {
              globalNavigationStore.setCurrentFocusedPage(menuOptions.noteshall)
              globalNavigationStore.setToPageNavigation()
              break
            }
            case menuOptions.notebookLanding: {
              globalNavigationStore.setCurrentFocusedPage(menuOptions.notebookLanding)
              globalNavigationStore.setToPageNavigation()
              break
            }
            default: break
          }
          break
        }
        case 'enter': {
          if (currentFocus === menuOptions.notebookLanding) {
            if (notebookList.length > 0) {
              setCurrentFocus(menuOptions.notebook)
              setCurrentNotebookId(notebookList[0].id!)
              break
            }
          }
        }
      }
    } else {
      switch(e.key.toLocaleLowerCase()) {
        case 'j':
        case 'arrowdown': {
          incrementNotebook()
          break
        }
        case 'k':
        case 'arrowup': {
          decrementNotebook()
          break
        }
        case 'escape': {
          setCurrentFocus(menuOptions.notebookLanding)
          setCurrentNotebookId(null)
          break
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
  }, [
    notebookList,
    currentFocus,
    globalNavigationStore.isInGlobalMenu,
    currentNotebookId
  ])
}

export default useGlobalMenuKeybind