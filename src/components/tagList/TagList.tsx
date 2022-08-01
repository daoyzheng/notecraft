import { ChangeEvent, useCallback, useContext } from "react"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string
  onTagsChange: (tags: string[]) => void
  onFinishEditTags: () => void
}
const TagList = ({ tags, className, onTagsChange, onFinishEditTags }: Props) => {
  const {
    isEditingTag,
    isAddingTag,
    currentTagIndex,
    setCurrentTagIndex,
    setIsEditingTag,
    setIsAddingTag,
    setNewTag,
    handleFinishAddingNewTag
  } = useContext(NoteDetailsCurrentElementContext)
  function handleNewTagOnChange (e: ChangeEvent) {
    const newTag = (e.target as HTMLInputElement).value
    setNewTag(newTag)
  }
  const handleAddNewTagOnBlur = useCallback(() => {
    setIsAddingTag(false)
    handleFinishAddingNewTag()
  }, [setIsAddingTag, handleFinishAddingNewTag])
  const isTagFocused = useCallback((index: number) : boolean => {
    return currentTagIndex === index && isEditingTag
  }, [currentTagIndex, isEditingTag])
  const handleOnTagChange = useCallback((tag: string, index: number) => {
    tags[index] = tag
    onTagsChange(tags)
  }, [onTagsChange])
  const handleFinishEditTag = useCallback(() => {
    onFinishEditTags()
  }, [onFinishEditTags])
  function handleAddTag() {
    setCurrentTagIndex(tags.length)
    setIsAddingTag(true)
    setIsEditingTag(true)
  }
  return (
    <div className={`${className} text-xs flex flex-row items-center gap-x-2`}>
      {
        tags.map((tag, index) =>
          <NoteTag
            tag={tag}
            key={index}
            index={index}
            isFocus={isTagFocused(index)}
            onTagChange={handleOnTagChange}
            onFinishEditTag={handleFinishEditTag}
          />
        )
      }
      {
        isAddingTag ?
          <input
            placeholder="add tag"
            className="focus:outline-none bg-transparent w-fit placeholder-gray-400 focus:placeholder-gray-400"
            onBlur={handleAddNewTagOnBlur}
            onChange={handleNewTagOnChange}
            autoFocus
          /> :
          (
            <div className={`${currentTagIndex === tags.length && isEditingTag ? 'text-blue-300' : ''} italic text-xs cursor-pointer hover:text-blue-300 text-zinc-300`} onClick={handleAddTag}>
              Add Tag
            </div>
          )
      }
    </div>
  )
}

export default TagList