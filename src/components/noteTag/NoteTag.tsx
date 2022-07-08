interface Props {
  tag: string
  className?: string
}
const NoteTag = ({ tag, className }: Props) => {
  return (
    <div className={`${className} cursor-pointer hover:text-blue-300`}>{tag}</div>
  )
}

export default NoteTag