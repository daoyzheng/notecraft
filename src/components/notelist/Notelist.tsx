import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { INote } from '../../interfaces/note'
import Input from '../input/Input'
import NoteDisplay from '../noteDisplay/NoteDisplay'
interface Props {
  noteList: INote[],
  currentNote: INote|null,
  className?: string
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote) => void
  onMouseEnter?: () => void
}

const Notelist = ({ className, onCreateNewNote, onSelectNote, noteList, currentNote, onMouseEnter } : Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<INote>({
    reValidateMode: 'onBlur',
    shouldUseNativeValidation: false,
    defaultValues: {
      title: '',
      isPublic: false,
      tags: [],
      createdAt: new Date().toISOString()
    }
  })
  const popupRef = useRef<HTMLDivElement>(null)
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
