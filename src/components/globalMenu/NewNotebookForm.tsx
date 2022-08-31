import { RefObject, useCallback, useMemo } from "react"
import useRegisterForm from "../../hooks/useRegisterForm"
import { INotebook } from "../../interfaces/note"
import { notebooksMock } from "../../utils/mock"
import Dialog from "../dialog/Dialog"
import Input from "../input/Input"
import Select from "../select/Select"

interface Props {
  onBlur: () => void
  blurException: RefObject<Element>
  onCreateNewNotebook: (newNotebook: INotebook) => void
}

const defaultValue = {
  id: null,
  name: '',
  createdAt: new Date().toISOString(),
  parentNotebookId: null,
  children: []
}
interface IOption {
  id: string
  label: string
}
const NewNotebookForm = ({ onBlur, blurException, onCreateNewNotebook }: Props) => {
  const [register, reset, handleSubmit, errors] = useRegisterForm<INotebook>({defaultValue})
  const handleDialogBlur = useCallback(() => {
    onBlur()
  },[onBlur])
  const handleCreateNewNotebook = useCallback((data: INotebook) => {
    onCreateNewNotebook && onCreateNewNotebook(data)
    reset()
  }, [onCreateNewNotebook])
  let notebookOptions: INotebook[] = []
  let options: IOption = []
  function getAllNotebooks(notebook: INotebook) {
    notebookOptions.push(notebook)
    if (notebook.children) {
      notebook.children.forEach(child => {
        getAllNotebooks(child)
      })
    }
  }

  function seedOptions() {
    notebooksMock.forEach(notebook => {
      getAllNotebooks(notebook)
    })
  }
  function parseOptions() {
    options = notebookOptions.map(option => ({id: option.id, label: option.name}))
  }
  seedOptions()
  parseOptions()


  return (
    <Dialog onBlur={handleDialogBlur} exception={blurException} className="absolute left-0 top-6 z-10">
      <div className="bg-white rounded text-black p-2 h-fit">
        <form onSubmit={handleSubmit(data => handleCreateNewNotebook(data))}>
          <div className="h-full">
            <Input register={register('name', {
                required: 'required'
              })}
              placeholder="Name *"
              className="focus:outline-none border-b-2 py-2 bg-transparent w-full placeholder-gray-400 focus:placeholder-gray-500 w-52"
              errorMessage={errors.name?.message}
              autoFocus
            />
            <Select
              register={register('parentNotebookId')}
              options={options}
              label="Select a parent"
            />
            <div className="flex justify-end mt-4 mb-1">
              <button type="submit" className="bg-blue-500 text-white px-2 rounded text-sm hover:bg-blue-600">Craft</button>
            </div>

          </div>
        </form>
      </div>
    </Dialog>
  )
}

export default NewNotebookForm