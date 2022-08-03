import { useCallback, useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import useRegisterForm from '../../hooks/useRegisterForm'
import { INote } from '../../interfaces/note'
import Input from '../input/Input'
import InputHint from '../inputHint/InputHint'
import NoteDisplay from '../noteDisplay/NoteDisplay'
import { NotelistContainer } from './Notelist.styled'
import useNotelistKeybind from './useNotelistKeybind'
interface Props {
  noteList: INote[]
  currentNote: INote|null
  className?: string
  isActive: boolean
  onCreateNewNote?: (newNote: INote) => void
  onSelectNote?: (note: INote|null) => void
  onMouseEnter?: () => void
  onBlur?: () => void
}

const Notelist = ({
    className,
    noteList,
    currentNote,
    isActive,
    onCreateNewNote,
    onSelectNote,
    onMouseEnter,
    onBlur
  } : Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const notelistRef = useRef<HTMLDivElement>(null)

  const defaultValue = {
    title: '',
    isPublic: false,
    tags: [],
    createdAt: new Date().toISOString()
  }
  const [register, reset, handleSubmit, errors] = useRegisterForm<INote>({defaultValue})
  useNotelistKeybind({
    isActive,
    showPopup,
    noteList,
    currentNote,
    notelistRef,
    onSelectNote,
    setShowPopup,
    onBlur,
    reset
  })
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
    if (note.id != currentNote?.id) {
      onSelectNote && onSelectNote(note)
    }
  }

  const handleEnterNodeList = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  const popup = () => (
    <div ref={popupRef} className="bg-white rounded absolute text-black p-2 right-0 h-fit top-5" >
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
    <div className={`px-2 pt-1 bg-zinc-800 text-white ${className} relative`} onMouseEnter={handleEnterNodeList}>
      <div className="flex flex row items-center justify-between my-2 pb-1">
        <div className="text-lg">New Notebook</div>
        <div className="relative flex items-center gap-x-1">
          <i className="material-icons-outlined text-sm cursor-pointer" onClick={() => setShowPopup(true)}>launch</i>
          {
            showPopup && popup()
          }
          <InputHint label="i"/>
        </div>
      </div>
      <NotelistContainer className="space-y-4" ref={notelistRef}>
        {
          noteList.map(note =>
            (
              <NoteDisplay key={note.id} note={note} onClick={handleSelectNote} className={`${currentNote?.id === note.id ? 'bg-blue-500' : ''}`}/>
            )
          )
        }
      </NotelistContainer>
      <div className="absolute bottom-0 w-full left-0 border-t py-1 px-1 h-14">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <InputHint label="i"/>
            <div className="ml-1 text-xs">: New Note</div>
          </div>
          <div className="flex items-center">
            <InputHint label="l"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_right"/><span className="mx-1">/</span><InputHint label="Enter"/>
            <div className="ml-1 text-xs">: Edit Note</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
            <div className="ml-1 text-xs">: Next note</div>
          </div>
          <div className="flex items-center">
            <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
            <div className="ml-1 text-xs">: Prev note</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notelist
