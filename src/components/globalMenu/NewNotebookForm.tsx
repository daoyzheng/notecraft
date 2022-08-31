import { ChangeEvent, RefObject, useCallback, useMemo, useState } from "react"
import useRegisterForm from "../../hooks/useRegisterForm"
import { INotebook } from "../../interfaces/note"
import { notebooksMock } from "../../utils/mock"
import Dialog from "../dialog/Dialog"
import Input from "../input/Input"
import Select, { IOption } from "../select/Select"

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

const NewNotebookForm = ({ onBlur, blurException, onCreateNewNotebook }: Props) => {
  const [register, reset, handleSubmit, errors] = useRegisterForm<INotebook>({defaultValue})
  const [isRootNotebook, setIsRootNotebook] = useState<boolean>(true)
  const handleDialogBlur = useCallback(() => {
    onBlur()
  },[onBlur])
  const handleCreateNewNotebook = useCallback((data: INotebook) => {
    onCreateNewNotebook && onCreateNewNotebook(data)
    reset()
  }, [onCreateNewNotebook])

  function handleRootNotebookChange (e: ChangeEvent) {
    const { checked } = (e.target as HTMLInputElement)
    setIsRootNotebook(checked)
  }

  function getAllNotebooks(notebook: INotebook, allOptions: INotebook[]) {
    allOptions.push(notebook)
    if (notebook.children) {
      notebook.children.forEach(child => {
        getAllNotebooks(child, allOptions)
      })
    }
  }

  const options = useMemo(() => {
    const allOptions: INotebook[] = []
    notebooksMock.forEach(notebook => {
      getAllNotebooks(notebook, allOptions)
    })
    return allOptions.map(option => ({id: option.id, label: option.name})) as IOption[]
  },[notebooksMock])

  return (
    <Dialog onBlur={handleDialogBlur} exception={blurException} className="absolute left-0 top-6 z-10">
      <div className="bg-white rounded text-black p-2 h-fit">
        <form onSubmit={handleSubmit(data => handleCreateNewNotebook(data))}>
          <Input register={register('name', {
              required: 'required'
            })}
            placeholder="Name"
            className="focus:outline-none border-b-2 py-2 bg-transparent w-full placeholder-gray-400 focus:placeholder-gray-500 w-52"
            errorMessage={errors.name?.message}
            autoFocus
          />
          <div className="flex items-center justify-between">
            <div>Make root notebook</div>
            <input type="checkbox" defaultChecked onChange={handleRootNotebookChange}/>
          </div>
          {
            !isRootNotebook &&
            <Select
              className="mt-1"
              register={register('parentNotebookId', {
                required: 'required'
              })}
              errorMessage={errors.parentNotebookId?.message}
              options={options}
              label="Select a parent notebook"
            />
          }
          <div className="flex justify-end mt-4 mb-1">
            <button type="submit" className="bg-blue-500 text-white px-2 rounded text-sm hover:bg-blue-600">Craft</button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

export default NewNotebookForm