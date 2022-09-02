import { observer } from "mobx-react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  notebookList: INotebook[]
  currentFocus: menuOptions
  onSelectNotebook?: (notebook: INotebook) => void
}
const NotebookList = observer(({ notebookList, currentFocus, onSelectNotebook }: Props) => {
  const { currentNotebook, setCurrentNotebook } = NotebookStore
  function handleSelectNotebook (notebook: INotebook) {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
  }

  function isWithinParent (notebook: INotebook): boolean {
    if (notebook.children.length === 0 || !currentNotebook) return false
    let found = notebook.children.some(child => child.id === currentNotebook.id)
    if (found) return true
    for (const child of notebook.children) {
      found = isWithinParent(child)
      if (found) break
    }
    return found
  }

  return (
    <ul>
      {notebookList.map(notebook => {
        return (
          <li key={notebook.id}>
            <div className="flex items-center">
              <i className={`material-icons text-xs mt-1 mr-2 ${notebook.children.length > 0 ? 'cursor-pointer' : 'text-transparent'}`}>add</i>
              <NotebookItem
                isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
                notebook={notebook}
                onClick={handleSelectNotebook}
              />
            </div>
            {
              notebook.children.length > 0 && (currentNotebook?.id === notebook.id || isWithinParent(notebook)) &&
              <NotebookList
                onSelectNotebook={handleSelectNotebook}
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