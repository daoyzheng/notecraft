import { observer } from "mobx-react"
import { useState } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import NotebookStore from "../../store/NotebookStore"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  notebookList: INotebook[]
  currentFocus: menuOptions
  onSelectNotebook?: (notebook: INotebook) => void
}
const NotebookList = observer(({ notebookList, currentFocus, onSelectNotebook }: Props) => {
  const { currentNotebookId, setCurrentNotebookId } = NotebookStore
  function handleSelectNotebook (notebook: INotebook) {
    setCurrentNotebookId(notebook.id ?? null)
    onSelectNotebook && onSelectNotebook(notebook)
  }

  function isWithinParent (notebook: INotebook) {
    return notebook.children.some(child => child.id === currentNotebookId)
  }

  return (
    <ul className="ml-3">
      {notebookList.map(notebook => {
        return (
          <li>
            <NotebookItem
              isActive={currentFocus == menuOptions.notebook && !!currentNotebookId && currentNotebookId === notebook.id}
              notebook={notebook}
              key={notebook.id}
              onClick={handleSelectNotebook}
            />
            {
              notebook.children.length > 0 && (currentNotebookId === notebook.id || isWithinParent(notebook)) &&
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