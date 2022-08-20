import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { menuFocusOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  currentFocus: menuFocusOptions
  notebookList: INotebook[]
  notebookListRef: RefObject<HTMLDivElement>
  setCurrentFocus: Dispatch<SetStateAction<menuFocusOptions>>
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

  useEffect(() => {
    if (currentFocus != menuFocusOptions.notebookSelection) {
      navigate(getRouteFromFocus())
    }
  }, [currentFocus])

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
              setCurrentNotebookId(notebookList[0].id!)
              setCurrentFocus(menuFocusOptions.notebookSelection)
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
          setCurrentFocus(menuFocusOptions.notebooks)
          setCurrentNotebookId(null)
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