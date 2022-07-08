import { useState } from "react"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string
}
const TagList = ({ tags, className }: Props) => {
  const [isAddingTag, setIsAddingTag] = useState<Boolean>(false)
  return (
    <div className={`${className} text-xs flex flex-row items-center gap-x-2`}>
      {
        tags.map((tag, index) =>
          <NoteTag tag={tag} key={index}/>
        )
      }
      {
        isAddingTag ?
          <input placeholder="add tag"/> :
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