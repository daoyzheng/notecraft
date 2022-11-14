import { Dispatch, SetStateAction, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

interface Props {
  globalNavigationStore: typeof GlobalNavigationStore
  showNewNotebookForm: boolean
  setShowNewNotebookForm: Dispatch<SetStateAction<boolean>>
}

const useGlobalMenuKeybind = ({
  globalNavigationStore,
  showNewNotebookForm,
  setShowNewNotebookForm,
}: Props) => {
  const { 
    isInGlobalMenu,
    setCurrentFocusedPage, 
    currentFocusedPage,
    setToPageNavigation
  } = globalNavigationStore
  const navigate = useNavigate()

  function getRouteFromFocus (focus: menuOptions) {
    switch(focus) {
      case menuOptions.notebookLanding: return routes.notebooks
      case menuOptions.noteshall: return routes.noteshall
      case menuOptions.notebookList: return routes.notebooks
      default: return routes.noteshall
    }
  }

  function MenuNavigationKeybind(e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'j':
      case 'arrowdown': {
        if (currentFocusedPage === menuOptions.notebookLanding) {
          setCurrentFocusedPage(currentFocusedPage+1)
          break 
        }
        if (currentFocusedPage !== menuOptions.notebookList) {
          setCurrentFocusedPage(currentFocusedPage+1)
          navigate(getRouteFromFocus(currentFocusedPage+1))
        }
        break
      }
      case 'k':
      case 'arrowup': {
        if (currentFocusedPage !== menuOptions.notebookList) {
          setCurrentFocusedPage(currentFocusedPage-1)
          navigate(getRouteFromFocus(currentFocusedPage-1))
        }
        break
      }
      case 'l':
      case 'enter':
      case 'arrowright': {
        setToPageNavigation()
        switch(currentFocusedPage) {
          case menuOptions.noteshall: {
            setCurrentFocusedPage(menuOptions.noteshall)
            break
          }
          case menuOptions.notebookLanding: {
            setCurrentFocusedPage(menuOptions.notebookLanding)
            break
          }
          default: break
        }
        break
      }
      case 'i': {
        e.preventDefault()
        setShowNewNotebookForm(true)
        break
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
    if (currentFocusedPage !== menuOptions.notebookList) {
      MenuNavigationKeybind(e)
    }
  }

  useEffect(() => {
    if (isInGlobalMenu) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [
    currentFocusedPage,
    isInGlobalMenu,
    showNewNotebookForm,
  ])

}

export default useGlobalMenuKeybind
