import { observer } from "mobx-react"
import { INote } from "../../interfaces/note"
import Preview from "../preview/Preview"

interface Props {
  className?: string
  note: INote
  onClick?: (note: INote) => void
}
const NoteDisplay = observer(({ className, note, onClick }: Props) => {
  function handleOnClick () {
    onClick && onClick(note)
  }
  return (
    <div className={`${className} hover:bg-blue-500 cursor-pointer rounded-sm px-1`} onClick={handleOnClick}>
      <div className="flex items-center">
        {/* {
          note.isPublic && <div className="px-1 bg-green-500 text-sm text-center rounded-sm">P</div>
        } */}
        <div className="truncate">{note.title}</div>
      </div>
      <div className="text-gray-400 line-clamp-3">
        <Preview doc={note.body ? note.body : ''}/>
      </div>
    </div>
  )
})

export default NoteDisplay