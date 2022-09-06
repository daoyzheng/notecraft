import { MouseEvent, useCallback } from "react"
import { INotebook } from "../../interfaces/note"
import { GlobalMenuItemIconWrapper } from "../globalMenu/GlobalMenuItem.styled"

interface Props {
  notebook: INotebook
  notebookToExpand: INotebook | null
  isActive: boolean
  isShowChildren: boolean
  onClick?: (notebook: INotebook) => void
  onExpandNotebook?: (notebook: INotebook) => void
  className?: string
}
const NotebookItem = ({ className, notebook, isActive, notebookToExpand, isShowChildren, onClick, onExpandNotebook }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick(notebook)
  }, [onClick])
  const handleExpandNotebook= useCallback((notebook: INotebook, e: MouseEvent) => {
    e.stopPropagation()
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])
  return (
    <div
      onClick={handleOnClick}
      className={`${className} flex w-full`}
    >
      <div className={`${isShowChildren ? 'text-amber-400': ''}`}>
        <i
          className={`material-icons text-sm mt-1 mr-2 ${notebook.children.length > 0 ? 'hover:text-amber-400 cursor-pointer' : 'text-transparent'}`}
          onClick={(e) => handleExpandNotebook(notebook,e)}
        >{notebookToExpand?.id === notebook.id ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}</i>
      </div>
      <div
        className={`${isActive ? 'bg-gray-500' : ''} bg-gray-800 pl-2 w-full rounded cursor-pointer flex items-center`}
      >{notebook.name}</div>
    </div>
  )
}

export default NotebookItem