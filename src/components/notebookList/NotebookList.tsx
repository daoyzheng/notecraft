import { useState } from "react"
import { INotebook } from "../../interfaces/note"
import { notebooksMock } from "../../utils/mock"
import { GlobalMenuItemIconWrapper } from "../globalMenu/GlobalMenuItem.styled"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  className?: string
  isFocused: boolean
}
const NotebookList = ({ className, isFocused }: Props) => {
  const [notebookList, setNotebookList] = useState<INotebook[]>(notebooksMock)
  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-x-2">
          <div>Notebooks</div>
          {
            isFocused ?
            <GlobalMenuItemIconWrapper
              className={`material-icons-outlined text-sm cursor-pointer ${isFocused ? 'text-blue-300' : ''}`}
            >keyboard_double_arrow_left</GlobalMenuItemIconWrapper> :
            <></>
          }
        </div>
        <i className="material-icons-outlined text-sm cursor-pointer">add_circle_outline</i>
      </div>
      <div className="ml-4 space-y-1 mt-1">
        {notebookList.map(notebook => (<NotebookItem notebook={notebook} key={notebook.id}/>))}
      </div>
    </div>
  )
}

export default NotebookList