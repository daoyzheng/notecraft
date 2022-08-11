import { ChangeEvent, MouseEvent, useCallback, useContext, useEffect, useState } from "react"
import { possibleNoteDetailsStates } from "../../constants/noteDetails"
import { INote } from "../../interfaces/note"
import { NoteDetailsStateContext } from "../../pages/notebook/useNoteDetailsStateContext"
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
  const [originalTitle, setOriginalTitle] = useState<string>(currentNote ? currentNote.title : '')
  const { setCurrentNoteDetailsState } = useContext(NoteDetailsStateContext)

  useEffect(() => {
    if (currentNote)
      setOriginalTitle(currentNote.title)
  }, [currentNote])

  const numberOfElements = 3

  const handleSaveTitle = useCallback(() => {
    onFinishEditTitle && onFinishEditTitle()
    setIsEditingTitle(false)
    if (currentNote) {
      setOriginalTitle(currentNote.title)
    }
    setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
  }, [onFinishEditTitle])

  const [
    currentElementIndex, setCurrentElementIndex,
    currentTagIndex, setCurrentTagIndex,
    isEditingTag, setIsEditingTag,
    isAddingTag, setIsAddingTag,
    isEditingSingleTag, setIsEditingSingleTag,
    newTag, setNewTag,
    originalTag, setOriginalTag
  ] = useNoteDetailsKeybind({
    isActive,
    isEditMode,
    isEditingTitle,
    numberOfElements,
    originalTitle,
    tags: currentNote ? currentNote.tags : [],
    onTitleChange,
    onTagsChange,
    handleSaveTitle,
    onFinishEditTags,
    handleFinishAddingNewTag,
    handleDeleteTag,
    onBlur,
    setIsEditMode,
    setIsEditingTitle,
    setCurrentNoteDetailsState
  })

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange && onDocChange(newDoc)
  }, [currentNote])

  function handleOnClick () {
    setIsEditMode(false)
    setIsEditingTitle(true)
    setIsEditingSingleTag(false)
    setIsAddingTag(false)
    setIsEditingTag(false)
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTitle)
    setCurrentElementIndex(0)
  }

  const handleOnBlur = useCallback(() => {
    onTitleChange && onTitleChange(originalTitle)
    setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
    setIsEditingTitle(false)
  }, [onTitleChange])

  const handleTitleChange = useCallback((e: ChangeEvent) => {
    onTitleChange && onTitleChange((e.target as HTMLInputElement).value)
  }, [onTitleChange])

  const handleFinishEditTags = useCallback(() => {
    if (currentNote && currentNote.tags.includes('')) {
      const updatedTags = currentNote.tags.filter(tag => tag)
      onTagsChange && onTagsChange(updatedTags)
    }
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

  function handleDeleteTag (index: number) {
    if (currentNote) {
      if (currentNote.tags.length === 1) {
        setIsEditingSingleTag(false)
        setIsEditingTag(false)
        setIsAddingTag(false)
        setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
      }
      if (index < currentNote.tags.length) {
        const updatedTags = currentNote.tags.filter((_, i) => i !== index)
        onTagsChange && onTagsChange(updatedTags)
        onFinishEditTags && onFinishEditTags()
      }
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
    setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
  }

  function saveNoteOnMouseLeave () {
    if (isEditingSingleTag) {
      const tags = currentNote ? currentNote.tags : []
      tags[currentTagIndex] = originalTag
      onTagsChange && onTagsChange(tags)
      onFinishEditTags && onFinishEditTags()
    }
    if (isEditingTitle) {
      onTitleChange && onTitleChange(originalTitle)
      onFinishEditTitle && onFinishEditTitle()
    }
    if (isEditMode) {
      onFinishEditDoc && onFinishEditDoc()
    }
  }

  function handleEditBody () {
    setIsEditMode(true)
    setIsEditingTitle(false)
    setIsEditingSingleTag(false)
    setIsAddingTag(false)
    setIsEditingTag(false)
    setCurrentElementIndex(numberOfElements-1)
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingBody)
  }

  const handleEditorOnBlur = useCallback(() => {
    setIsEditMode(false)
    onFinishEditDoc && onFinishEditDoc()
    setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
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
          <div className="flex flex-row gap-x-10 items-center w-full" onBlur={handleOnBlur}>
            {
              isEditingTitle ?
              <div className="flex items-center w-full">
                <input
                  defaultValue={currentNote.title}
                  className="focus:outline-none bg-transparent w-full placeholder-white focus:placeholder-white"
                  onChange={handleTitleChange}
                  autoFocus
                />
                <button className="ml-4 w-6 rounded bg-zinc-600 hover:bg-zinc-700 mr-2" onMouseDown={handleSaveTitle}>
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
            originalTag={originalTag} setOriginalTag={setOriginalTag}
            isEditingSingleTag={isEditingSingleTag} setIsEditingSingleTag={setIsEditingSingleTag}
            handleFinishAddingNewTag={handleFinishAddingNewTag} setNewTag={setNewTag}
            handleDeleteTag={handleDeleteTag}
            setCurrentElementIndex={setCurrentElementIndex}
            setCurrentNoteDetailsState={setCurrentNoteDetailsState}
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
                  showPlaceholder
                />
            }
          </div>
        </div>
      }
    </div>
  )
}

export default NoteDetails