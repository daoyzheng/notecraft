import { ChangeEvent, useCallback, useContext, useState } from "react"
import Input from "../input/Input"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string,
  onFinishEditTags?: (tags: string[]) => void
}
const TagList = ({ tags, className, onFinishEditTags }: Props) => {
  const [isAddingTag, setIsAddingTag] = useState<Boolean>(false)
  const [newTag, setNewTag] = useState<string>('')
  const {
    isEditingTag,
    currentTagIndex,
    setCurrentTagIndex,
    setIsEditingTag
  } = useContext(NoteDetailsCurrentElementContext)
  function handleNewTagOnChange (e: ChangeEvent) {
    const newTag = (e.target as HTMLInputElement).value
    setNewTag(newTag)
  }
  const handleAddNewTagOnBlur = useCallback(() => {
    if (newTag) {
      const updatedTags = [...tags, newTag]
      onFinishEditTags && onFinishEditTags(updatedTags)
      setNewTag('')
    }
    setIsAddingTag(false)
  }, [onFinishEditTags, newTag])
  const isTagFocused = useCallback((index: number) : boolean => {
    return currentTagIndex === index && isEditingTag
  }, [currentTagIndex, isEditingTag])
  function handleAddTag() {
    setCurrentTagIndex(tags.length)
    setIsAddingTag(true)
    setIsEditingTag(true)
  }
  return (
    <div className={`${className} text-xs flex flex-row items-center gap-x-2`}>
      {
        tags.map((tag, index) =>
          <NoteTag tag={tag} key={index} index={index} isFocus={isTagFocused(index)}/>
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
            <div className={`${currentTagIndex === tags.length && isEditingTag ? 'text-blue-300' : ''} text-xs cursor-pointer hover:text-blue-300`} onClick={handleAddTag}>
              Add Tag
            </div>
          )
      }
    </div>
  )
}

export default TagList