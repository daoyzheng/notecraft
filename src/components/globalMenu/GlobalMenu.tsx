import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import { notebooksMock } from "../../utils/mock"
import NotebookList from "../notebookList/NotebookList"
import GlobalMenuItem from "./GlobalMenuItem"
import { NotebookListContainer } from "./GlobalMenuItem.styled"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

const GlobalMenu = observer(() => {
  const location = useLocation()
  const [currentFocus, setCurrentFocus] = useState<menuOptions>(getFocus())
  const [notebookList, setNotebookList] = useState<INotebook[]>(notebooksMock)
  const notebookListRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore
  const { setCurrentNotebook } = NotebookStore
  const navigate = useNavigate()

  function getFocus () {
    switch (location.pathname) {
      case `/${routes.notebooks}`: {
        return menuOptions.notebookLanding
      }
      case `/${routes.noteshall}`: {
        return menuOptions.noteshall
      }
      default: return menuOptions.noteshall
    }
  }

  useEffect(() => {
    if (currentFocus !== menuOptions.notebook) {
      setCurrentNotebook(null)
      setCurrentNotebooks([])
      globalNavigationStore.setCurrentRootNotebook(null)
    }
  }, [currentFocus])

  const {
    setParentNotebook,
    setCurrentNotebooks
  } = useGlobalMenuKeybind({
    notebookList,
    globalNavigationStore,
    currentFocus,
    notebookListRef,
    setCurrentFocus,
  })
  function handleNotebookClick () {
    navigate(routes.notebooks)
    setCurrentFocus(menuOptions.notebookLanding)
    setCurrentNotebook(null)
  }
  function handleNotesHallClick () {
    navigate(routes.noteshall)
    setCurrentFocus(menuOptions.noteshall)
  }

  function getParentNotebook (notebooks: INotebook[], parentNotebookId: number|null) : INotebook|null {
    const parentNotebook = notebooks.find(notebook => notebook.id === parentNotebookId)
    if (parentNotebook) return parentNotebook
    for (const notebook of notebooks) {
      if (notebook.children.length > 0) {
        return getParentNotebook(notebook.children, parentNotebookId)
      }
      return null
    }
    return null
  }

  function handleSelectNotebook (notebook: INotebook) {
    if (!notebook.parentNotebookId)
      globalNavigationStore.setCurrentRootNotebook(notebook)
    const parentNotebook = getParentNotebook(notebookList, notebook.parentNotebookId)
    setParentNotebook(parentNotebook)
    setCurrentNotebooks(parentNotebook ? parentNotebook.children : notebookList)
    setCurrentFocus(menuOptions.notebook)
  }
  return (
    <div className="justify-between flex flex-col h-full">
      <div>
        <GlobalMenuItem
          isFocused={currentFocus === menuOptions.noteshall}
          onClick={handleNotesHallClick}
        >
          <div>Notes Hall</div>
        </GlobalMenuItem>
        <div>
        </div>
        <div className="flex flex-row items-center mt-3 mb-1">
          <GlobalMenuItem
            isFocused={currentFocus === menuOptions.notebookLanding}
            onClick={handleNotebookClick}
          >
            <div>Notebooks</div>
          </GlobalMenuItem>
          <i className={`${currentFocus === menuOptions.notebookLanding ? 'text-blue-300' : ''} material-icons-outlined text-sm cursor-pointer`}>add_circle_outline</i>
        </div>
        <NotebookListContainer ref={notebookListRef}>
          <NotebookList
            onSelectNotebook={handleSelectNotebook}
            notebookList={notebookList}
            currentFocus={currentFocus}
          />
        </NotebookListContainer>
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu