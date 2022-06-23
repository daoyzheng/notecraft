interface Props {
  className: string
  onCreateNewNote: () => void
}
const noteLists = [
  {
    title: 'How to create markdown file',
    date: '2020-06-14',
    body: 'testing note here'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  }
]
const Notelist = ({ className, onCreateNewNote } : Props) => {
  function handleOnClick () {
    onCreateNewNote()
  }

  return (
    <div className={`px-2 bg-stone-800 text-white ${className}`}>
      <div className="flex flex row items-center justify-between my-2 border-buttom border-b pb-1 border-gray-400">
        <div>New Notebook</div>
        <i className="material-icons-outlined text-md cursor-pointer" onClick={handleOnClick}>add_box</i>
      </div>
      <div>
        {
          noteLists.map(note =>
            (
              <div>
                {note.title}
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
