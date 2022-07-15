import { ChangeEvent, useCallback, useState } from "react"
import Input from "../input/Input"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string,
  onFinishEditTags?: (tags: string[]) => void
}
const TagList = ({ tags, className, onFinishEditTags }: Props) => {
  const [isAddingTag, setIsAddingTag] = useState<Boolean>(false)
  const [newTag, setNewTag] = useState<string>('')
  function handleNewTagOnChange (e: ChangeEvent) {
    const newTag = (e.target as HTMLInputElement).value
    setNewTag(newTag)
  }
  const handleAddNewTagOnBlur = useCallback(() => {
    const updatedTags = [...tags, newTag]
    onFinishEditTags && onFinishEditTags(updatedTags)
    setIsAddingTag(false)
  }, [onFinishEditTags])
  const handleTagUpdate = useCallback((tag: string, index: number) => {
    tags[index] = tag
    onFinishEditTags && onFinishEditTags(tags)
  }, [onFinishEditTags])
  return (
    <div className={`${className} text-xs flex flex-row items-center gap-x-2`}>
      {
        tags.map((tag, index) =>
          <NoteTag tag={tag} key={index} index={index} onChange={handleTagUpdate}/>
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
            <div className="text-xs cursor-pointer" onClick={() => setIsAddingTag(true)}>
              Add Tag
            </div>
          )
      }
    </div>
  )
}

export default TagList