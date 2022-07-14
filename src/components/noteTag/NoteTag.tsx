import { ChangeEvent, useCallback, useState } from "react"

interface Props {
  tag: string
  key: number
  className?: string
  onChange?: (tag: string, index: number) => void
}
const NoteTag = ({ tag, key, className, onChange }: Props) => {
  const [isEditingTag, setIsEditingTag] = useState<Boolean>(false)
  const [updatedTag, setUpdatedTag] = useState<string>(tag)
  const handleSaveTag = useCallback(() => {
    onChange && onChange(updatedTag, key)
    setIsEditingTag(false)
  }, [onChange])
  function handleTagChange (e: ChangeEvent) {
    const tag = (e.target as HTMLInputElement).value
    setUpdatedTag(tag)
  }
  function handleClick () {
    setIsEditingTag(true)
  }
  return (
    isEditingTag ?
      <input
        className="focus:outline-none bg-transparent w-min placeholder-gray-400 focus:placeholder-gray-400"
        onBlur={handleSaveTag}
        onChange={handleTagChange}
        value={updatedTag}
        autoFocus
      /> :
      <div className={`${className} hover:text-blue-300 cursor-pointer`} onClick={handleClick}>{updatedTag}</div>
  )
}

export default NoteTag