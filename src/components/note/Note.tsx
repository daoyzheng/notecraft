import { INote } from "../../interfaces/note"

interface Props {
  className?: string
  note: INote
}
const Note = ({ className, note }: Props) => {
  return (
    <div className={`${className}`}>
      {note.title}
    </div>
  )
}

export default Note