import { ChangeEvent, FocusEventHandler, useCallback, useState } from "react"
import { INote } from "../../interfaces/note"
import Editor from "../editor/Editor"
import Preview from "../preview/Preview"

interface Props {
  className?: string
  currentNote: INote | null
  onDocChange?: (doc: string) => void
  onTitleChange?: (title: string) => void
}

const NoteDetails = ({ className, currentNote, onDocChange, onTitleChange } : Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange && onDocChange(newDoc)
  }, [currentNote])

  function handleOnClick () {
    setIsEditingTitle(true)
  }

  const handleOnBlur = useCallback(() => {
    // onTitleChange && onTitleChange()
    setIsEditingTitle(false)
  }, [onTitleChange])

  const handleTitleChange = useCallback((e: ChangeEvent) => {
    onTitleChange && onTitleChange((e.target as HTMLInputElement).value)
  }, [onTitleChange])

  return (
    <div className={`${className} px-2 pt-2 bg-zinc-800 text-white`}>
      {
        !currentNote ?
        <div className="flex justify-center items-center h-full text-gray-400">
          <div className="flex flex-col items-center">
            <div className="w-16">
              <img src="/src/assets/imgs/notebook.png" alt="notebook"/>
            </div>
            <div className="mt-4">Create a new note or select a note and craft on</div>
          </div>
        </div> :
        <div>
          <div className="flex flex-row gap-x-10 items-center">
            {
              isEditingTitle ?
              <input
                defaultValue={currentNote.title}
                className="focus:outline-none py-2 bg-transparent w-full placeholder-white focus:placeholder-white"
                onBlur={handleOnBlur}
                onChange={handleTitleChange}
                autoFocus
              /> :
              <div className="text-xl cursor-pointer" onClick={handleOnClick}>{currentNote.title}</div>
            }
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
                <Editor
                  initialDoc={currentNote?.body ? currentNote.body : ''}
                  docKey={currentNote?.id ? `${currentNote.id}` : ''}
                  onChange={handleDocChange}
                /> :
                <Preview
                  doc={currentNote?.body ? currentNote.body : ''}
                />
            }
          </div>
        </div>
      }
    </div>
  )
}

export default NoteDetails