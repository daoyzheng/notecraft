import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"
import { INote } from "../../interfaces/note"
import Editor from "../editor/Editor"
import Preview from "../preview/Preview"
import TagList from "../tagList/TagList"

interface Props {
  className?: string
  currentNote: INote | null
  isActive: boolean
  onDocChange?: (doc: string) => void
  onTitleChange?: (title: string) => void
  onFinishEditTitle?: () => void
  onTagsChange?: (tags: string[]) => void
  onMouseEnter?: () => void
}

const NoteDetails = ({
  className,
  currentNote,
  onDocChange,
  onTitleChange,
  onTagsChange,
  onFinishEditTitle,
  onMouseEnter
} : Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange && onDocChange(newDoc)
  }, [currentNote])

  function handleOnClick () {
    setIsEditingTitle(true)
  }

  function handleKeyDown (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      onFinishEditTitle && onFinishEditTitle()
      setIsEditingTitle(false)
    }
  }

  const handleOnBlur = useCallback(() => {
    onFinishEditTitle && onFinishEditTitle()
    setIsEditingTitle(false)
  }, [onFinishEditTitle])

  const handleTitleChange = useCallback((e: ChangeEvent) => {
    onTitleChange && onTitleChange((e.target as HTMLInputElement).value)
  }, [onTitleChange])

  const handleTagsChange = useCallback((tags: string[]) => {
    onTagsChange && onTagsChange(tags)
  }, [onTagsChange])

  const handleEnterNodeDetails = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  return (
    <div className={`${className} px-2 pt-2 bg-zinc-800 text-white`} onMouseEnter={handleEnterNodeDetails}>
      {
        !currentNote ?
        <div className="flex justify-center items-center h-full text-gray-400">
          <div className="flex flex-col items-center">
            <div className="w-12">
              <img src="/src/assets/imgs/notebook.png" alt="notebook"/>
            </div>
            <div className="mt-4">Create a new note or select a note and craft on</div>
          </div>
        </div> :
        <div>
          <div className="flex flex-row gap-x-10 items-center w-full cursor-pointer" onClick={handleOnClick}>
            {
              isEditingTitle ?
              <input
                defaultValue={currentNote.title}
                className="focus:outline-none bg-transparent w-full placeholder-white focus:placeholder-white"
                onBlur={handleOnBlur}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                autoFocus
              /> :
              <div className="text-xl hover:text-blue-300">{currentNote.title}</div>
            }
          </div>
          <TagList className="mt-2" tags={currentNote.tags} onFinishEditTags={handleTagsChange}/>
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