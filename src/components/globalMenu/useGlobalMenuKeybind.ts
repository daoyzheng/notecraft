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
  showNewNotebookForm: boolean
  setCurrentFocus: Dispatch<SetStateAction<menuOptions>>
  setShowNewNotebookForm: Dispatch<SetStateAction<boolean>>
  handleExpandNotebook: (notebook: INotebook, forceState?: boolean) => void
}

const useGlobalMenuKeybind = ({
  globalNavigationStore,
  currentFocus,
  notebookList,
  notebookListRef,
  showNewNotebookForm,
  setShowNewNotebookForm,
  setCurrentFocus,
  handleExpandNotebook
}: Props) => {
  const navigate = useNavigate()
  const { currentNotebook, setCurrentNotebook, updateCurrentNotebook, getGrandparentNotebook } = NotebookStore
  const [currentNotebooks, setCurrentNotebooks] = useState<INotebook[]>(notebookList)
  const [parentNotebook, setParentNotebook] = useState<INotebook|null>(null)

  const offset = 0.8
  const segment = notebookListRef.current && (notebookListRef.current.scrollHeight / notebookList.length * offset)
  function incrementNotebook () {
    const currentIndex = currentNotebooks.findIndex(notebook => notebook.id === currentNotebook?.id)
    if (currentIndex < currentNotebooks.length - 1) {
      const selectedNotebook = currentNotebooks[currentIndex+1]
      setCurrentNotebook(selectedNotebook)
      if (notebookListRef.current) {
        notebookListRef.current.scrollTop += segment ? segment : 0
      }
    } else {
      setCurrentNotebook(currentNotebooks[0])
      if (notebookListRef.current)
        notebookListRef.current.scrollTop = 0
    }
  }

  function decrementNotebook () {
    const currentIndex = currentNotebooks.findIndex(notebook => notebook.id === currentNotebook?.id)
    if (currentIndex > 0) {
      const selectedNotebook = currentNotebooks[currentIndex-1]
      setCurrentNotebook(selectedNotebook)
      if (notebookListRef.current)
        notebookListRef.current.scrollTop -= segment ? segment : 0
    } else {
      const selectedNotebook = currentNotebooks[currentNotebooks.length - 1]
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

  function updateCurrentNotebookExpandState (notebook: INotebook) {
    const currentNotebookToUpdate = {...notebook}
    currentNotebookToUpdate.expand = !notebook.expand
    updateCurrentNotebook(currentNotebookToUpdate)
  }

  function MenuNavigationKeybind(e: KeyboardEvent) {
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
            setCurrentNotebooks(notebookList)
            const selectedNotebook = notebookList[0]
            setCurrentNotebook(selectedNotebook)
            break
          }
        }
      }
    }
  }

  function NotebookNavigationKeybind (e: KeyboardEvent) {
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
          handleExpandNotebook(currentNotebook, true)
          updateCurrentNotebookExpandState(currentNotebook)
          setCurrentNotebook(currentNotebook.children[0])
        }
        break
      }
      case 'escape': {
        if (!currentNotebook) break
        if (!currentNotebook.parentNotebookId) {
          setCurrentNotebook(null)
          setCurrentFocus(menuOptions.notebookLanding)
          setCurrentNotebooks(notebookList)
        } else {
          const grandParentNotebook = getGrandparentNotebook(currentNotebook.id!)
          if (!grandParentNotebook) {
            setCurrentNotebooks(notebookList)
            const parentNotebook = notebookList.find(notebook => notebook.id === currentNotebook.parentNotebookId)
            setCurrentNotebook(parentNotebook ?? null)
            if (parentNotebook) {
              handleExpandNotebook(parentNotebook, false)
              updateCurrentNotebookExpandState(parentNotebook)
            }
          }
          else {
            setCurrentNotebooks(grandParentNotebook.children)
            const parentNotebook = grandParentNotebook.children.find(notebook => notebook.id === currentNotebook.parentNotebookId)
            setCurrentNotebook(parentNotebook ?? null)
            if (parentNotebook) {
              handleExpandNotebook(parentNotebook, false)
              updateCurrentNotebookExpandState(parentNotebook)
            }
          }
        }
        break
      }
      case 'e': {
        if (currentNotebook && currentNotebook.children.length > 0) {
          handleExpandNotebook(currentNotebook)
          updateCurrentNotebookExpandState(currentNotebook)
        }
      }
    }
  }

  function handleKeyPress (e: KeyboardEvent) {
    if (showNewNotebookForm) {
      switch(e.key.toLocaleLowerCase()) {
        case 'escape': {
          setShowNewNotebookForm(false)
        }
      }
      return
    }
    if (currentFocus !== menuOptions.notebook) {
      MenuNavigationKeybind(e)
    } else {
      NotebookNavigationKeybind(e)
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
    showNewNotebookForm,
    currentNotebooks
  ])

  return {
    setParentNotebook,
    setCurrentNotebooks
  }
}

export default useGlobalMenuKeybind