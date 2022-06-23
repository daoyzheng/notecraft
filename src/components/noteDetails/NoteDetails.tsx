interface Props {
  className?: string
}
const NoteDetails = ({ className } : Props) => {
  return (
    <div className={`px-2 pt-2 bg-stone-800 text-white ${className}`}>
      <div className="flex flex-row gap-x-3 items-center">
        <div>Note Title</div>
        <i className="material-icons-outlined text-sm cursor-pointer">edit</i>
      </div>
      <div className="text-xs mt-2 flex flex-row items-center gap-x-2">
        <div>Tag1</div>
        <div>Tag2</div>
        <div>Tag3</div>
      </div>
      <div className="mt-5">
        Body
      </div>
    </div>
  )
}

export default NoteDetails