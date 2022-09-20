import { observer } from "mobx-react"
import { Children, useCallback } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import NotebookStore from "../../store/NotebookStore"
import NotebookItem from "../notebookItem/NotebookItem"
import { Line } from "./NotebookList.styled"

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

  const lineColor = 'bg-gray-500'

  return (
    <ul>
      {notebookList.map((notebook, index) => {
        return (
          <li key={notebook.id}>
            <div className="flex items-center mb-1 relative">
              { notebook.parentNotebookId && <Line className={`${lineColor} absolute -left-1 top-3`} height={2} width={8} />}
              { notebook.children.length > 0 && notebook.expand && <Line className={`absolute ${lineColor} top-7 left-2`} style={{ height: 'calc(100% - 10px)'}} width={2} />}
              <NotebookItem
                isActive={currentFocus == menuOptions.notebook && !!currentNotebook?.id && currentNotebook.id === notebook.id}
                notebook={notebook}
                onExpandNotebook={handleOnExpandNotebook}
                onClick={handleSelectNotebook}
              />
            </div>
            {
              notebook.expand &&
              <div className="relative">
                { notebook.children.length > 0 && notebook.expand && <Line className={`absolute ${lineColor} left-2 top-3`} width={2} style={{height: 'calc(100% - 27px)'}}/>}
                { notebookList.length - 1 === index && <Line className="absolute bg-zinc-900 -left-1" width={2} style={{height: 'calc(100% + 3px)'}} top={-18}/> }
                <NotebookList
                  onSelectNotebook={handleSelectNotebook}
                  onExpandNotebook={handleOnExpandNotebook}
                  notebookList={notebook.children}
                  currentFocus={currentFocus}
                />
              </div>
            }
          </li>
        )
      })}
    </ul>
  )
})

export default NotebookList