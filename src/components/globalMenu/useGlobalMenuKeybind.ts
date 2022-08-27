import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"
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
  const { currentNotebook, setCurrentNotebook } = NotebookStore
  const [currentNotebooks, setCurrentNotebooks] = useState<INotebook[]>(notebookList)
  const [parentNotebook, setParentNotebook] = useState<INotebook|null>(null)

  const offset = 0.8
  const segment = notebookListRef.current && (notebookListRef.current.scrollHeight / notebookList.length * offset)
  function incrementNotebook () {
    const currentIndex = currentNotebooks.findIndex(notebook => notebook.id === currentNotebook?.id)
    if (currentIndex < currentNotebooks.length - 1) {
      const selectedNotebook = currentNotebooks[currentIndex+1]
      if (!selectedNotebook.parentNotebookId)
        globalNavigationStore.setCurrentRootNotebook(selectedNotebook)
      setCurrentNotebook(selectedNotebook)
      if (notebookListRef.current) {
        notebookListRef.current.scrollTop += segment ? segment : 0
      }
    } else {
      if (!currentNotebooks[0].parentNotebookId)
        globalNavigationStore.setCurrentRootNotebook(currentNotebooks[0])
      setCurrentNotebook(currentNotebooks[0])
      if (notebookListRef.current)
        notebookListRef.current.scrollTop = 0
    }
  }

  function decrementNotebook () {
    const currentIndex = currentNotebooks.findIndex(notebook => notebook.id === currentNotebook?.id)
    if (currentIndex > 0) {
      const selectedNotebook = currentNotebooks[currentIndex-1]
      if (!selectedNotebook.parentNotebookId)
        globalNavigationStore.setCurrentRootNotebook(selectedNotebook)
      setCurrentNotebook(selectedNotebook)
      if (notebookListRef.current)
        notebookListRef.current.scrollTop -= segment ? segment : 0
    } else {
      const selectedNotebook = currentNotebooks[currentNotebooks.length - 1]
      if (!selectedNotebook.parentNotebookId)
        globalNavigationStore.setCurrentRootNotebook(selectedNotebook)
      setCurrentNotebook(selectedNotebook)
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

  function getTargetNotebooks (notebookList: INotebook[]): INotebook[] {
    let targetNotebooks: INotebook[] = []
    if (!parentNotebook || !parentNotebook.parentNotebookId) return targetNotebooks
    if (parentNotebook.parentNotebookId) {
      for (const notebook of notebookList) {
        if (notebook.children.length > 0) {
          const targetNotebook = notebook.children.find(child => child.id === parentNotebook.parentNotebookId)
            || (notebook.id === parentNotebook.parentNotebookId && notebook)
          if (targetNotebook) {
            setParentNotebook(targetNotebook)
            targetNotebooks = targetNotebook.children
            return targetNotebooks
          }
          return getTargetNotebooks(notebook.children)
        }
      }
    }
    return targetNotebooks
  }

  function setNotebookListOfParent () {
    const targetNotebooks = getTargetNotebooks(notebookList)
    if (targetNotebooks.length > 0) {
      setCurrentNotebook(targetNotebooks.find(n => n.id === parentNotebook?.id) ?? null)
      setCurrentNotebooks(targetNotebooks)
    } else {
      setCurrentNotebook(notebookList.find(n => n.id === parentNotebook?.id) ?? null)
      setCurrentNotebooks(notebookList)
      setParentNotebook(null)
    }
    if (!parentNotebook) {
      setCurrentFocus(menuOptions.notebookLanding)
      setCurrentNotebook(null)
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
              const selectedNotebook = notebookList[0]
              if (!selectedNotebook.parentNotebookId)
                globalNavigationStore.setCurrentRootNotebook(selectedNotebook)
              setCurrentNotebook(selectedNotebook)
              break
            }
          }
        }
      }
    } else {
      switch(e.key.toLocaleLowerCase()) {
        case 'j':
        case 'arrowdown': {
          setCurrentFocus(menuOptions.notebook)
          incrementNotebook()
          break
        }
        case 'k':
        case 'arrowup': {
          setCurrentFocus(menuOptions.notebook)
          decrementNotebook()
          break
        }
        case 'l':
        case 'arrowright': {
          globalNavigationStore.setCurrentFocusedPage(menuOptions.notebook)
          globalNavigationStore.setToPageNavigation()
          break
        }
        case 'enter': {
          if (currentNotebook && currentNotebook.children.length > 0) {
            setParentNotebook(currentNotebook)
            setCurrentNotebooks(currentNotebook.children)
            setCurrentNotebook(currentNotebook.children[0])
          }
          break
        }
        case 'escape': {
          setNotebookListOfParent()
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
    parentNotebook,
    globalNavigationStore.isInGlobalMenu,
    currentNotebook,
    currentNotebooks
  ])

  return {
    setParentNotebook,
    setCurrentNotebooks
  }
}

export default useGlobalMenuKeybind