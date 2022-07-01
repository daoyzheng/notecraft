import { useCallback, useState } from "react"
import { INote } from "../../interfaces/note"
import Editor from "../editor/Editor"
import Preview from "../preview/Preview"

interface Props {
  className?: string
  currentNote: INote | null
  onDocChange?: (doc: string) => void
}

const NoteDetails = ({ className, currentNote, onDocChange } : Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange &&  onDocChange(newDoc)
  }, [currentNote])

  return (
    <div className={`px-2 pt-2 bg-zinc-800 text-white ${className}`}>
      <div className="flex flex-row gap-x-10 items-center">
        <div className="text-xl">{currentNote?.title}</div>
      </div>
      <div className="text-xs mt-2 flex flex-row items-center gap-x-2">
        <div>Tag1</div>
        <div>Tag2</div>
        <div>Tag3</div>
      </div>
      <div className="flex justify-end">
        { !isEditMode ?
            <i className="material-icons-outlined text-md cursor-pointer" onClick={() => setIsEditMode(true)}>edit_note</i> :
            <i className="material-icons-outlined text-md cursor-pointer" onClick={() => setIsEditMode(false)}>done</i>
        }
      </div>
      <div className="mt-5">
        {
          isEditMode ?
            <Editor initialDoc={currentNote?.body ? currentNote.body : ''} onChange={handleDocChange}/> :
            <Preview doc={currentNote?.body ? currentNote.body : ''}/>
        }
      </div>
    </div>
  )
}

export default NoteDetails