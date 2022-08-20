import { INotebook } from "../../interfaces/note"
import NotebookItem from "../notebookItem/NotebookItem"

interface Props {
  className?: string
  notebookList: INotebook[]
  selectedNotebook: INotebook|null
}
const NotebookList = ({ className, notebookList, selectedNotebook }: Props) => {
  return (
    <div className={`${className}`}>
      <div className="ml-3 space-y-1">
        {notebookList.map(notebook => (
          <NotebookItem
            isActive={!!selectedNotebook && selectedNotebook.id === notebook.id}
            notebook={notebook}
            key={notebook.id}
          />
        ))}
      </div>
    </div>
  )
}

export default NotebookList