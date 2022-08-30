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
  const { currentRootNotebook } = GlobalNavigationStore
  function handleSelectNotebook (notebook: INotebook) {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
  }

  function isExpandNotebooks(notebook: INotebook, currentRootNotebook: INotebook|null): boolean {
    if (!currentRootNotebook || currentRootNotebook.children.length === 0) return false
    if (notebook.id === currentRootNotebook.id) return true
    let found = false
    for (const child of currentRootNotebook.children) {
      found = isExpandNotebooks(notebook, child)
      if (found) break
    }
    return found
  }

  return (
    <ul className="ml-2">
      {notebookList.map(notebook => {
        return (
          <li key={notebook.id}>
            <NotebookItem
              isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
              notebook={notebook}
              onClick={handleSelectNotebook}
            />
            {
              notebook.children.length > 0 && isExpandNotebooks(notebook, currentRootNotebook) &&
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