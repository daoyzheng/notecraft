import { useCallback } from "react"
import { INotebook } from "../../interfaces/note"
import { GlobalMenuItemIconWrapper } from "../globalMenu/GlobalMenuItem.styled"

interface Props {
  notebook: INotebook
  isActive: boolean
  onClick?: (notebook: INotebook) => void
  className?: string
}
const NotebookItem = ({ className, notebook, isActive, onClick }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick(notebook)
  }, [onClick])
  return (
    <div className={`${isActive ? 'text-blue-300': ''} ${className} hover:text-blue-300 flex flex-row items-center gap-x-2`}>
      <div className="cursor-pointer" onClick={handleOnClick}>{notebook.name}</div>
      {
        isActive
        ? <GlobalMenuItemIconWrapper
          className="material-icons-outlined text-sm text-blue-300"
        >keyboard_double_arrow_left</GlobalMenuItemIconWrapper>
        : <></>
      }
    </div>
  )
}

export default NotebookItem