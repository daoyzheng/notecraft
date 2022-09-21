import { MouseEvent, useCallback } from "react"
import { INotebook } from "../../interfaces/note"
import NotebookStore from "../../store/NotebookStore"

interface Props {
  notebook: INotebook
  isActive: boolean
  onClick?: (notebook: INotebook) => void
  onExpandNotebook?: (notebook: INotebook) => void
  className?: string
}
const NotebookItem = ({ className, notebook, isActive, onClick, onExpandNotebook }: Props) => {
  const { isNotebookAncestorOfCurrentNotebook } = NotebookStore
  const handleOnClick = useCallback(() => {
    onClick && onClick(notebook)
  }, [onClick])
  const handleExpandNotebook= useCallback((notebook: INotebook, e: MouseEvent) => {
    e.stopPropagation()
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])

  function isCurrentNotebookHidden(notebook: INotebook) {
    return isNotebookAncestorOfCurrentNotebook(notebook) && !notebook.expand
  }

  return (
    <div
      className={`${className} flex w-full min-w-fit max-w-48
        ${isActive && 'bg-blue-500'} rounded-sm pl-1 hover:bg-blue-500 items-center
        ${isCurrentNotebookHidden(notebook) && 'bg-amber-500 hover:bg-amber-600'}`
      }
    >
      {
        notebook.children.length > 0 ?
        <div className="h-7 w-5 flex items-center">
          <button
            className="material-icons text-sm mr-1 text-amber-400 hover:bg-gray-500 cursor-pointer h-5 w-4 focus:outline-none bg-gray-800 rounded-sm shadow-lg"
            onClick={(e) => handleExpandNotebook(notebook,e)}
          >{!notebook.expand ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}</button>
        </div> :
        <div className="h-7 w-5 mr-1"/>
      }
      <div
        className="ml-2 w-full rounded cursor-pointer flex items-center text-ellipsis max-w-48 truncate"
        onClick={handleOnClick}
      >{notebook.name}</div>
    </div>
  )
}

export default NotebookItem