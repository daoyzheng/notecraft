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
  const { currentNotebook, setCurrentNotebook } = NotebookStore
  const handleSelectNotebook = useCallback((notebook: INotebook) => {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
  },[onSelectNotebook])

  const handleOnExpandNotebook = useCallback((notebook: INotebook) => {
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])

  function isNotebookAncestorOfCurrentNotebook(notebook: INotebook) {
    return isAncestor(notebook)
  }
  function isAncestor(notebook: INotebook): boolean {
    if (!currentNotebook) return false
    if (notebook.children.some(child => child.id === currentNotebook.id)) return true
    for (const child of notebook.children) {
      return isAncestor(child)
    }
    return false
  }

  const isCurrentNotebookHidden = useCallback((notebook: INotebook) => {
    return notebook.children.length > 0 && !notebook.expand && isNotebookAncestorOfCurrentNotebook(notebook)
  }, [currentNotebook])

  return (
    <ul>
      {notebookList.map(notebook => {
        return (
          <li key={notebook.id}>
            <div className="flex items-center mb-1 ">
              <NotebookItem
                isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
                isCurrentNotebookHidden={isCurrentNotebookHidden(notebook)}
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