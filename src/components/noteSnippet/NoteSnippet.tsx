interface Props {
  className?: string
}
const NoteSnippet = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      Snippet
    </div>
  )
}

export default NoteSnippet