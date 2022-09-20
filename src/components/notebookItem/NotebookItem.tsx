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
  return (
    <div
      className={`${className} flex w-full min-w-fit ${isActive && 'bg-blue-500'} rounded-sm pl-1 hover:bg-blue-500 items-center`}
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
        className="ml-2 w-full rounded cursor-pointer flex items-center whitespace-nowrap"
        onClick={handleOnClick}
      >{notebook.name}</div>
      {
        isNotebookAncestorOfCurrentNotebook(notebook) && !notebook.expand &&
        <span className="material-icons text-sm text-amber-500">keyboard_double_arrow_down</span>
      }
    </div>
  )
}

export default NotebookItem