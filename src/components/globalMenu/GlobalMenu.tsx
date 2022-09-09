import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import NotebookList from "../notebookList/NotebookList"
import { IconWrapper } from "./GlobalMenu.styled"
import GlobalMenuItem from "./GlobalMenuItem"
import { NotebookListContainer } from "./GlobalMenuItem.styled"
import NewNotebookForm from "./NewNotebookForm"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

const GlobalMenu = observer(() => {
  const location = useLocation()
  const { allNotebooks } = NotebookStore
  const [currentFocus, setCurrentFocus] = useState<menuOptions>(getFocus())
  const [notebookList, setNotebookList] = useState<INotebook[]>(allNotebooks)
  const [showNewNotebookForm, setShowNewNotebookForm] = useState<boolean>(false)
  const notebookListRef = useRef<HTMLDivElement>(null)
  const newNotebookFormRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore
  const { setCurrentNotebook, updateNotebook } = NotebookStore
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
    showNewNotebookForm,
    setCurrentFocus,
    setShowNewNotebookForm,
    handleExpandNotebook
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
    const parentNotebook = getParentNotebook(notebookList, notebook.parentNotebookId)
    setParentNotebook(parentNotebook)
    setCurrentNotebooks(parentNotebook ? parentNotebook.children : notebookList)
    setCurrentFocus(menuOptions.notebook)
  }
  function handleExpandNotebook (notebook: INotebook, forceState: boolean|undefined = undefined) {
    const notebookToUpdate = {...notebook}
    notebookToUpdate.expand = forceState === undefined ? !notebook.expand : forceState
    updateNotebook(notebookToUpdate)
  }
  function handleShowNewNotebookForm () {
    setShowNewNotebookForm(!showNewNotebookForm)
  }
  function handleNewNotebookBlur () {
    setShowNewNotebookForm(false)
  }
  function handleCreateNewNotebook (data: INotebook) {
    setShowNewNotebookForm(false)
    if (data.parentNotebookId) {
      let notebookToUpdate = null
      for (const notebook of notebookList) {
        notebookToUpdate = getNotebook(notebook, data.parentNotebookId)
        if (notebookToUpdate) break
      }
      if (notebookToUpdate) notebookToUpdate.children.push(data)
    } else
      notebookList.push(data)
    setNotebookList(notebookList)
  }
  function getNotebook(notebook: INotebook, notebookId: number): INotebook | null {
    if (notebook.id == notebookId) return notebook
    if (notebook.children.length > 0) {
      for (const child of notebook.children) {
        return getNotebook(child, notebookId)
      }
    }
    return null
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
        <div className="flex flex-row items-center mt-3 mb-1 relative">
          <GlobalMenuItem
            isFocused={currentFocus === menuOptions.notebookLanding}
            onClick={handleNotebookClick}
          >
            <div>Notebooks</div>
          </GlobalMenuItem>
          <IconWrapper
            size="15"
            marginBottom="1"
            ref={newNotebookFormRef}
            className={`${showNewNotebookForm ? 'bg-green-600' : 'bg-green-700'} material-icons-outlined cursor-pointer rounded-sm hover:bg-green-600`}
            onClick={handleShowNewNotebookForm}>add
          </IconWrapper>
          {
            showNewNotebookForm &&
            <NewNotebookForm
              onBlur={handleNewNotebookBlur}
              blurException={newNotebookFormRef}
              onCreateNewNotebook={handleCreateNewNotebook}
            />
          }
          <IconWrapper className="material-icons ml-2 cursor-pointer rounded-sm text-gray-400 rounded-sm border border-gray-400 bg-gray-700">minimize</IconWrapper>
        </div>
        <NotebookListContainer ref={notebookListRef} className="mt-2">
          <NotebookList
            onSelectNotebook={handleSelectNotebook}
            onExpandNotebook={handleExpandNotebook}
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