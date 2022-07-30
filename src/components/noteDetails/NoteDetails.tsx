import { ChangeEvent, useCallback, useState } from "react"
import { INote } from "../../interfaces/note"
import Editor from "../editor/Editor"
import Preview from "../preview/Preview"
import TagList from "../tagList/TagList"
import { NoteDetailsCurrentElementContextProvider } from "./CurrentElementIndexContext"
import useNoteDetailsKeybind from "./useNoteDetailsKeybind"

interface Props {
  className?: string
  currentNote: INote | null
  isActive: boolean
  onDocChange?: (doc: string) => void
  onFinishEditDoc?: () => void
  onTitleChange?: (title: string) => void
  onFinishEditTitle?: () => void
  onTagsChange?: (tags: string[]) => void
  onFinishEditTags?: () => void
  onMouseEnter?: () => void
  onBlur?: () => void
}

const NoteDetails = ({
  className,
  currentNote,
  isActive,
  onDocChange,
  onFinishEditDoc,
  onTitleChange,
  onTagsChange,
  onFinishEditTitle,
  onFinishEditTags,
  onMouseEnter,
  onBlur
} : Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const numberOfElements = 3

  const [
    currentElementIndex, setCurrentElementIndex,
    currentTagIndex, setCurrentTagIndex,
    isEditingTag, setIsEditingTag,
    isAddingTag, setIsAddingTag,
    isEditingSingleTag, setIsEditingSingleTag,
    newTag, setNewTag
  ] = useNoteDetailsKeybind({
    isActive,
    isEditMode,
    isEditingTitle,
    numberOfElements,
    numberOfTags: currentNote ? currentNote.tags.length : 0,
    onFinishEditTitle,
    onFinishEditTags,
    handleFinishAddingNewTag,
    onBlur,
    setIsEditMode,
    setIsEditingTitle
  })

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange && onDocChange(newDoc)
  }, [currentNote])

  function handleOnClick () {
    setIsEditingTitle(true)
    setCurrentElementIndex(0)
  }

  const handleOnBlur = useCallback(() => {
    onFinishEditTitle && onFinishEditTitle()
    setIsEditingTitle(false)
  }, [onFinishEditTitle])

  const handleTitleChange = useCallback((e: ChangeEvent) => {
    onTitleChange && onTitleChange((e.target as HTMLInputElement).value)
  }, [onTitleChange])

  const handleFinishEditTags = useCallback(() => {
    onFinishEditTags && onFinishEditTags()
  }, [onFinishEditTags])

  function handleFinishAddingNewTag () {
    if (currentNote && newTag) {
      const tags = [...currentNote.tags, newTag]
      onTagsChange && onTagsChange(tags)
      onFinishEditTags && onFinishEditTags()
      setNewTag('')
    }
  }

  const handleTagsChange = useCallback((tags: string[]) => {
    onTagsChange && onTagsChange(tags)
  }, [onTagsChange])

  const handleEnterNodeDetails = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  function handleMouseLeave () {
    saveNoteOnMouseLeave()
    setCurrentElementIndex(0)
    setCurrentTagIndex(0)
    setIsEditingSingleTag(false)
    setIsAddingTag(false)
    setIsEditingTag(false)
    setIsEditMode(false)
    setIsEditingTitle(false)
  }

  function saveNoteOnMouseLeave () {
    if (isEditingSingleTag) {
      onFinishEditTags && onFinishEditTags()
    }
    if (isEditingTitle) {
      onFinishEditTitle && onFinishEditTitle()
    }
    if (isEditMode) {
      onFinishEditDoc && onFinishEditDoc()
    }
  }

  function handleEditBody () {
    setIsEditMode(true)
    setCurrentElementIndex(numberOfElements)
  }

  const handleEditorOnBlur = useCallback(() => {
    setIsEditMode(false)
    onFinishEditDoc && onFinishEditDoc()
  },[currentNote])

  return (
    <div className={`${className} px-2 pt-2 bg-zinc-800 text-white`} onMouseEnter={handleEnterNodeDetails} onMouseLeave={handleMouseLeave}>
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
          <div className="flex flex-row gap-x-10 items-center w-full">
            {
              isEditingTitle ?
              <div className="flex items-center w-full">
                <input
                  defaultValue={currentNote.title}
                  className="focus:outline-none bg-transparent w-full placeholder-white focus:placeholder-white"
                  onBlur={handleOnBlur}
                  onChange={handleTitleChange}
                  autoFocus
                />
                <button className="mx-2 w-6 rounded bg-zinc-600 hover:bg-zinc-700" onClick={() => handleOnBlur()}>
                  <i className="material-icons-outlined text-xs text-green-300 hover:text-green-400">done</i>
                </button>
              </div> :
              <div className={`${currentElementIndex === 0 ? 'text-blue-300' : ''} text-xl hover:text-blue-300 cursor-pointer`} onClick={handleOnClick}>{currentNote.title}</div>
            }
          </div>
          <NoteDetailsCurrentElementContextProvider
            currentTagIndex={currentTagIndex} setCurrentTagIndex={setCurrentTagIndex}
            isEditingTag={isEditingTag} setIsEditingTag={setIsEditingTag}
            isAddingTag={isAddingTag} setIsAddingTag={setIsAddingTag}
            isEditingSingleTag={isEditingSingleTag} setIsEditingSingleTag={setIsEditingSingleTag}
            handleFinishAddingNewTag={handleFinishAddingNewTag} setNewTag={setNewTag}
            setCurrentElementIndex={setCurrentElementIndex}
          >
            <TagList
              className={`mt-2 ${currentElementIndex === 1 && !isEditingTag ? 'text-blue-300' : ''}`}
              tags={currentNote.tags}
              onTagsChange={handleTagsChange}
              onFinishEditTags={handleFinishEditTags}
            />
          </NoteDetailsCurrentElementContextProvider>
          <div className="mt-5">
            {
              isEditMode ?
                <Editor
                  initialDoc={currentNote?.body ? currentNote.body : ''}
                  docKey={currentNote?.id ? `${currentNote.id}` : ''}
                  onChange={handleDocChange}
                  onBlur={handleEditorOnBlur}
                /> :
                <Preview
                  className={`${currentElementIndex === numberOfElements - 1 ? 'text-blue-300' : ''} cursor-pointer hover:text-blue-300`}
                  onClick={handleEditBody}
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