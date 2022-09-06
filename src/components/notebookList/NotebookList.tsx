import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import NotebookItem from "../notebookItem/NotebookItem"
import useNotebookListKeybind from "./useNotebookListKeybind"

interface Props {
  notebookList: INotebook[]
  currentFocus: menuOptions
  onSelectNotebook?: (notebook: INotebook) => void
}
const NotebookList = observer(({ notebookList, currentFocus, onSelectNotebook }: Props) => {
  const { currentNotebook, setCurrentNotebook } = NotebookStore
  const globalNavigationStore = GlobalNavigationStore
  const {
    isShowChildren,
    notebookToExpand,
    handleExpandChildren
  } = useNotebookListKeybind({
    globalNavigationStore,
    currentFocus,
    currentNotebook
  })
  function handleSelectNotebook (notebook: INotebook) {
    setCurrentNotebook(notebook)
    onSelectNotebook && onSelectNotebook(notebook)
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