import { useCallback } from "react"
import { INotebook } from "../../interfaces/note"
import { GlobalMenuItemIconWrapper } from "../globalMenu/GlobalMenuItem.styled"

interface Props {
  notebook: INotebook
  isActive: boolean
  onClick?: (notebook: INotebook) => void
}
const NotebookItem = ({ notebook, isActive, onClick }: Props) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick(notebook)
  }, [onClick])
  return (
    <div className={`${isActive ? 'text-blue-300': ''} hover:text-blue-300 cursor-pointer flex flex-row items-center gap-x-2`} onClick={handleOnClick}>
      <div>{notebook.name}</div>
      {
        isActive
        ? <GlobalMenuItemIconWrapper
          className="material-icons-outlined text-sm cursor-pointer text-blue-300"
        >keyboard_double_arrow_left</GlobalMenuItemIconWrapper>
        : <></>
      }
    </div>
  )
}

export default NotebookItem