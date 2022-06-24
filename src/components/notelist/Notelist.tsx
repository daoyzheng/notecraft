import { useState } from 'react'
import { INoteList } from '../../interfaces/note'
interface Props {
  className?: string
  onCreateNewNote: () => void
}
const Notelist = ({ className, onCreateNewNote } : Props) => {
  const [noteList, setNoteList] = useState<INoteList[]>([
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
  ])
  function handleOnClick () {
    const newNote = {
      id: noteList.length + 1,
      title: 'How to create markdown file',
      date: '2020-06-14'
    }
    setNoteList(oldNoteList => [...oldNoteList, newNote])
    onCreateNewNote()
  }

  return (
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className}`}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <i className="material-icons-outlined text-sm cursor-pointer" onClick={handleOnClick}>launch</i>
      </div>
      <div className="space-y-2">
        {
          noteList.map(note =>
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
