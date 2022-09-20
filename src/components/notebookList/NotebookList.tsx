import { observer } from "mobx-react"
import { useCallback, useContext } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import NotebookStore from "../../store/NotebookStore"
import { NotebookListContext } from "../globalMenu/useNotebookListContext"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  notebookList: INotebook[]
  currentFocus: menuOptions
  onSelectNotebook?: (notebook: INotebook) => void
  onExpandNotebook?: (notebook: INotebook) => void
}
const NotebookList = observer(({ notebookList, currentFocus, onSelectNotebook, onExpandNotebook }: Props) => {
  const {
    currentNotebook,
    setCurrentNotebook
  } = NotebookStore
  const handleSelectNotebook = useCallback((notebook: INotebook) => {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
  },[onSelectNotebook])

  const handleOnExpandNotebook = useCallback((notebook: INotebook) => {
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])

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