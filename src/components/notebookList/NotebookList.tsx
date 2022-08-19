import { useState } from "react"
import { INotebook } from "../../interfaces/note"
import { notebooksMock } from "../../utils/mock"
import { GlobalMenuItemIconWrapper } from "../globalMenu/GlobalMenuItem.styled"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  className?: string
}
const NotebookList = ({ className }: Props) => {
  const [notebookList, setNotebookList] = useState<INotebook[]>(notebooksMock)
  return (
    <div className={`${className}`}>
      <div className="ml-3 space-y-1">
        {notebookList.map(notebook => (<NotebookItem notebook={notebook} key={notebook.id}/>))}
      </div>
    </div>
  )
}

export default NotebookList