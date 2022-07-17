import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import useRegisterForm from '../../hooks/useRegisterForm'
import { INote } from '../../interfaces/note'
import Input from '../input/Input'
import NoteDisplay from '../noteDisplay/NoteDisplay'
interface Props {
  noteList: INote[],
  currentNote: INote|null,
  className?: string
  isActive: boolean
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote|null) => void
  onMouseEnter?: () => void
}

const Notelist = ({ className, onCreateNewNote, onSelectNote, noteList, currentNote, onMouseEnter, isActive } : Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const defaultValue = {
    title: '',
    isPublic: false,
    tags: [],
    createdAt: new Date().toISOString()
  }
  const [register, reset, handleSubmit, errors] = useRegisterForm<INote>({defaultValue})
  useOutsideAlerter({
    ref: popupRef,
    onClickOutside: handleClickOutside
  })
  function handleCreateNewNote (data: INote) {
    setShowPopup(false)
    onCreateNewNote && onCreateNewNote(data)
    reset()
  }

  function handleClickOutside () {
    setShowPopup(false)
    reset()
  }

  function handleSelectNote (note: INote) {
    if (note.id != currentNote?.id)
      onSelectNote && onSelectNote(note)
  }

  const handleEnterNodeList = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  function handleKeyPress (e: KeyboardEvent) {
    switch(e.key.toLocaleLowerCase()) {
      case 'j': {
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[0])
        } else {
          const currentIndex = noteList.findIndex(note => note.id === currentNote.id)
          if (currentIndex < noteList.length) {
            onSelectNote && onSelectNote(noteList[currentIndex + 1])
          } else {
            onSelectNote && onSelectNote(null)
          }
        }
        break
      }
      case 'k': {
        if (!currentNote) {
          onSelectNote && onSelectNote(noteList[noteList.length - 1])
        } else {
          const currentIndex = noteList.findIndex(note => note.id === currentNote.id)
          if (currentIndex > 0) {
            onSelectNote && onSelectNote(noteList[currentIndex - 1])
          } else {
            onSelectNote && onSelectNote(null)
          }
        }
        break
      }
    }
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keypress', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [isActive, currentNote])

  const popup = () => (
    <div ref={popupRef} className="bg-white rounded absolute text-black p-2 right-0 h-fit" >
      <form onSubmit={handleSubmit(data => handleCreateNewNote(data))}>
        <Input register={register('title', {
            required: 'Please enter a title for your note'
          })}
          placeholder="Title"
          className="focus:outline-none border-b-2 py-2 bg-transparent w-full placeholder-gray-400 focus:placeholder-gray-400 w-52"
          errorMessage={errors.title?.message}
          autoFocus
        />
        <div className="flex items-center justify-between">
          <div>Make note public</div>
          <Input
            className="w-4 h-4"
            register={register('isPublic')}
            type="checkbox"
          />
        </div>
        <div className="flex justify-end mt-4 mb-1">
          <button type="submit" className="bg-blue-500 text-white px-2 rounded text-sm hover:bg-blue-600">Craft</button>
        </div>
      </form>
    </div>
  )

  return (
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className}`} onMouseEnter={handleEnterNodeList}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <div className="relative">
          <i className="material-icons-outlined text-sm cursor-pointer" onClick={() => setShowPopup(true)}>launch</i>
          {
            showPopup && popup()
          }
        </div>
      </div>
      <div className="space-y-4">
        {
          noteList.map(note =>
            (
              <NoteDisplay key={note.id} note={note} onClick={handleSelectNote} className={`${currentNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notelist
