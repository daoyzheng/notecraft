import { useState } from "react"
import { INotebook } from "../../interfaces/note"
import { notebooksMock } from "../../utils/mock"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  className?: string
  isActive: boolean
}
const NotebookList = ({ className, isActive }: Props) => {
  const [notebookList, setNotebookList] = useState<INotebook[]>(notebooksMock)
  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center">
        <div>Notebooks</div>
        <i className="material-icons-outlined text-sm cursor-pointer">add_circle_outline</i>
      </div>
      <div className="ml-4 space-y-1 mt-1">
        {notebookList.map(notebook => (<NotebookItem notebook={notebook} key={notebook.id}/>))}
      </div>
    </div>
  )
}

export default NotebookList