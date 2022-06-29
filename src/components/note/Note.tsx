import { INote } from "../../interfaces/note"

interface Props {
  className?: string
  note: INote
}
const Note = ({ className, note }: Props) => {
  return (
    <div className={`${className} hover:bg-blue-500 cursor-pointer rounded-sm`}>
      <div>{note.title}</div>
      <div className="text-gray-400 whitespace-normal break-words line-clamp-3">
        {note.body}
      </div>
    </div>
  )
}

export default Note