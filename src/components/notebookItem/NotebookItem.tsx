import { MouseEvent, useCallback } from "react"
import { INotebook } from "../../interfaces/note"

interface Props {
  notebook: INotebook
  isActive: boolean
  onClick?: (notebook: INotebook) => void
  onExpandNotebook?: (notebook: INotebook) => void
  className?: string
}
const NotebookItem = ({ className, notebook, isActive, onClick, onExpandNotebook }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick(notebook)
  }, [onClick])
  const handleExpandNotebook= useCallback((notebook: INotebook, e: MouseEvent) => {
    e.stopPropagation()
    onExpandNotebook && onExpandNotebook(notebook)
  }, [onExpandNotebook])
  return (
    <div
      className={`${className} flex w-full ${isActive && 'bg-blue-500'} rounded-sm pl-1 hover:bg-blue-500 items-center`}
    >
      {
        notebook.children.length > 0 ?
        <div className={`${notebook.expand ? 'text-amber-400': ''} h-7 w-5 mb-1`}>
          <button
            className="material-icons text-sm mt-1 mr-1 hover:text-amber-400 cursor-pointer h-6 w-5 focus:outline-none"
            onClick={(e) => handleExpandNotebook(notebook,e)}
          >{!notebook.expand ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}</button>
        </div> :
        <div className="h-7 w-5 mb-1 mr-1"/>
      }
      <div
        className="ml-2 w-full rounded cursor-pointer flex items-center"
        onClick={handleOnClick}
      >{notebook.name}</div>
    </div>
  )
}

export default NotebookItem