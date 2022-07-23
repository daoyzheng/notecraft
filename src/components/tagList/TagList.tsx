import { ChangeEvent, useCallback, useContext, useState } from "react"
import Input from "../input/Input"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string
  onTagsChange: (tags: string[]) => void
  onFinishEditTags: () => void
}
const TagList = ({ tags, className, onTagsChange, onFinishEditTags }: Props) => {
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
      tags[tags.length] = newTag
      onTagsChange(tags)
      setNewTag('')
    }
    setIsAddingTag(false)
  }, [newTag])
  const isTagFocused = useCallback((index: number) : boolean => {
    return currentTagIndex === index && isEditingTag
  }, [currentTagIndex, isEditingTag])
  const handleOnTagChange = useCallback((tag: string, index: number) => {
    if (tag === '')
      tags.splice(index, 1)
    else
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
            <div className={`${currentTagIndex === tags.length && isEditingTag ? 'text-blue-300' : ''} text-xs cursor-pointer hover:text-blue-300`} onClick={handleAddTag}>
              Add Tag
            </div>
          )
      }
    </div>
  )
}

export default TagList