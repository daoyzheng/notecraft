import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem, INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import { notebookListMock } from "../../utils/mock"
import NotebookList from "../notebookList/NotebookList"
import { IconWrapper } from "./GlobalMenu.styled"
import GlobalMenuItem from "./GlobalMenuItem"
import NewNotebookForm from "./NewNotebookForm"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

const GlobalMenu = observer(() => {
  const location = useLocation()
  const { allNotebooks } = NotebookStore
  const [notebookList, setNotebookList] = useState<IDirectoryItem[]>(notebookListMock)
  const [currentFocus, setCurrentFocus] = useState<menuOptions>(getFocus())
  const [isDirTreeActive, setIsDirTreeActive] = useState<boolean>(false)
  const [showNewNotebookForm, setShowNewNotebookForm] = useState<boolean>(false)
  const notebookListRef = useRef<HTMLDivElement>(null)
  const newNotebookFormRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore
  const {
    setCurrentNotebook,
    updateNotebook,
    collapseAllNotebooks,
    getParentNotebook
  } = NotebookStore
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
    menuIndex,
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

  function handleSelectNotebook (notebook: INotebook) {
    const parentNotebook = getParentNotebook(notebook.parentNotebookId)
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
  function handleMinimizeAllNotebooks() {
    collapseAllNotebooks()
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
            size="14"
            marginBottom="1"
            ref={newNotebookFormRef}
            className={`${showNewNotebookForm ? 'bg-green-500' : 'bg-green-600'} material-icons-outlined cursor-pointer rounded-sm hover:bg-green-500`}
            onClick={handleShowNewNotebookForm}
          >add</IconWrapper>
          {
            showNewNotebookForm &&
            <NewNotebookForm
              onBlur={handleNewNotebookBlur}
              blurException={newNotebookFormRef}
              onCreateNewNotebook={handleCreateNewNotebook}
            />
          }
          <IconWrapper
            className="material-icons ml-2 cursor-pointer text-gray-400 rounded-sm border border-gray-400 bg-gray-700 hover:bg-gray-600"
            onClick={handleMinimizeAllNotebooks}
          >minimize</IconWrapper>
        </div>
        <NotebookList notebookList={notebookList} isActive={true}/>
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu
