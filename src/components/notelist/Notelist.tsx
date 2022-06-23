interface Props {
  className?: string
  onCreateNewNote: () => void
}
const noteLists = [
  {
    id: 1,
    title: 'How to create markdown file',
    date: '2020-06-14',
    body: 'testing note here'
  },
  {
    id: 2,
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    id: 3,
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    id: 4,
    title: 'How to create markdown file',
    date: '2020-06-14'
  }
]
const Notelist = ({ className, onCreateNewNote } : Props) => {
  function handleOnClick () {
    onCreateNewNote()
  }

  return (
    <div className={`px-2 pt-1 bg-stone-800 text-white ${className}`}>
      <div className="flex flex row items-center justify-between my-2 border-buttom border-b pb-1 border-gray-400">
        <div>New Notebook</div>
        <i className="material-icons-outlined text-md cursor-pointer" onClick={handleOnClick}>add_box</i>
      </div>
      <div className="space-y-2">
        {
          noteLists.map(note =>
            (
              <div key={note.id}>
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
