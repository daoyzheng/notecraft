import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
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
  const [isShowChildren, setIsShowChildren] = useState<boolean>(false)
  const [notebookToExpand, setNotebookToExpand] = useState<INotebook|null>(null)
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

  function handleExpandChildren (notebook: INotebook) {
    if (isShowChildren) {
      if (notebookToExpand?.id != notebook.id) {
        setNotebookToExpand(notebook)
        setIsShowChildren(true)
      } else {
        setNotebookToExpand(null)
        setIsShowChildren(false)
      }
    } else {
      setIsShowChildren(true)
      setNotebookToExpand(notebook)
    }
  }

  const showChildren = useCallback((notebook: INotebook) => {
    return isShowChildren && notebookToExpand?.id === notebook.id
  }, [isShowChildren, notebookToExpand])

  return (
    <ul>
      {notebookList.map(notebook => {
        return (
          <li key={notebook.id}>
            <div className="flex items-center mb-1 ">
              <NotebookItem
                isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
                notebook={notebook}
                notebookToExpand={notebookToExpand}
                onExpandNotebook={handleExpandChildren}
                onClick={handleSelectNotebook}
                isShowChildren={showChildren(notebook)}
              />
            </div>
            {
              showChildren(notebook) &&
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