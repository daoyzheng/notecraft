import { RefObject, useCallback, useEffect } from "react"
import { DeepRequired, FieldErrorsImpl, UseFormRegister, UseFormReset } from "react-hook-form"
import useRegisterForm from "../../hooks/useRegisterForm"
import { INote } from "../../interfaces/note"
import Dialog from "../dialog/Dialog"
import Input from "../input/Input"

interface Props {
  onCreateNewNote: (newNote: INote) => void
  blurException: RefObject<Element>
  onBlur: () => void
}

const defaultValue = {
  title: '',
  isPublic: false,
  tags: [],
  createdAt: new Date().toISOString()
}

const NewNoteForm = ({ onBlur, onCreateNewNote, blurException }: Props) => {
  const [register, reset, handleSubmit, errors] = useRegisterForm<INote>({defaultValue})
  useEffect(() => {
    reset()
  },[])
  const handleDialogBlur = useCallback(() => {
    onBlur()
    reset()
  },[onBlur])
  const handleCreateNewNote = useCallback((data: INote) => {
    onCreateNewNote && onCreateNewNote(data)
    reset()
  }, [onCreateNewNote])
  return (
    <Dialog onBlur={handleDialogBlur} exception={blurException} className="absolute right-0 top-5">
      <div className="bg-white rounded text-black p-2 h-fit" >
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
              className="w-4 h-4 cursor-pointer"
              register={register('isPublic')}
              type="checkbox"
            />
          </div>
          <div className="flex justify-end mt-4 mb-1">
            <button type="submit" className="bg-blue-500 text-white px-2 rounded text-sm hover:bg-blue-600">Craft</button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

export default NewNoteForm