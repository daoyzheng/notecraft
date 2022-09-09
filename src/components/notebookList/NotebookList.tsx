import { observer } from "mobx-react"
import { useCallback } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import NotebookStore from "../../store/NotebookStore"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  notebookList: INotebook[]
  currentFocus: menuOptions
  onSelectNotebook?: (notebook: INotebook) => void
  onExpandNotebook?: (notebook: INotebook) => void
}
const NotebookList = observer(({ notebookList, currentFocus, onSelectNotebook, onExpandNotebook }: Props) => {
  const { currentNotebook, setCurrentNotebook, updateCurrentNotebook } = NotebookStore
  const handleSelectNotebook = useCallback((notebook: INotebook) => {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
  },[onSelectNotebook])

  const handleOnExpandNotebook = useCallback((notebook: INotebook) => {
    if (isNotebookAncestorOfCurrentNotebook(notebook) && notebook.expand) {
      setCurrentNotebook(notebook)
      const currentNotebookToUpdate = {...notebook}
      currentNotebookToUpdate.expand = false
      updateCurrentNotebook(currentNotebookToUpdate)
    }
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])

  function isNotebookAncestorOfCurrentNotebook(notebook: INotebook) {
    return isAncestor(notebook)
  }
  function isAncestor(notebook: INotebook): boolean {
    if (!currentNotebook) return false
    if (notebook.children.some(child => child.id === currentNotebook.id)) return true
    let isFound = false
    for (const child of notebook.children) {
      isFound = isAncestor(child)
      if (isFound) return isFound
    }
    return false
  }

  return (
    <ul>
      {notebookList.map(notebook => {
        return (
          <li key={notebook.id}>
            <div className="flex items-center mb-1 ">
              <NotebookItem
                isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
                notebook={notebook}
                onExpandNotebook={handleOnExpandNotebook}
                onClick={handleSelectNotebook}
              />
            </div>
            {
              notebook.expand &&
              <NotebookList
                onSelectNotebook={handleSelectNotebook}
                onExpandNotebook={handleOnExpandNotebook}
                notebookList={notebook.children}
                currentFocus={currentFocus}
              />
            }
          </li>
        )
      })}
    </ul>
  )
})

export default NotebookList