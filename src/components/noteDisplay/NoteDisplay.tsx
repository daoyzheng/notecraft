import { INote } from "../../interfaces/note"
import Preview from "../preview/Preview"

interface Props {
  className?: string
  note: INote
  onClick?: (note: INote) => void
}
const NoteDisplay = ({ className, note, onClick }: Props) => {
  function handleOnClick () {
    onClick && onClick(note)
  }
  return (
    <div className={`${className} hover:bg-blue-500 cursor-pointer rounded-sm`} onClick={handleOnClick}>
      <div className="truncate">{note.title}</div>
      <div className="text-gray-400 line-clamp-3">
        <Preview doc={note.body ? note.body : ''}/>
      </div>
    </div>
  )
}

export default NoteDisplay