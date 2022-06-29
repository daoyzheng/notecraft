import { INote } from "../../interfaces/note"

interface Props {
  className?: string
  note: INote
  onClick?: (note: INote) => void
}
const Note = ({ className, note, onClick }: Props) => {
  function handleOnClick () {
    onClick && onClick(note)
  }
  return (
    <div className={`${className} hover:bg-blue-500 cursor-pointer rounded-sm`} onClick={handleOnClick}>
      <div>{note.title}</div>
      <div className="text-gray-400 break-all line-clamp-3">
        {note.body}
      </div>
    </div>
  )
}

export default Note