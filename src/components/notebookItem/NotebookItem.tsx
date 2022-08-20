import { INotebook } from "../../interfaces/note"

interface Props {
  notebook: INotebook
  isActive: boolean
}
const NotebookItem = ({ notebook, isActive }: Props) => {
  return (
    <div className={`${isActive ? 'text-blue-300': ''} hover:text-blue-300 cursor-pointer`}>
      {notebook.name}
    </div>
  )
}

export default NotebookItem