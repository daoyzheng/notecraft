import { INotebook } from "../../interfaces/note"

interface Props {
  notebook: INotebook
}
const NotebookItem = ({ notebook }: Props) => {
  return (
    <div className="hover:text-blue-300 cursor-pointer">
      {notebook.name}
    </div>
  )
}

export default NotebookItem