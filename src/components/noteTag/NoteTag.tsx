interface Props {
  tag: string
}
const NoteTag = ({ tag }: Props) => {
  return (
    <div>{tag}</div>
  )
}

export default NoteTag