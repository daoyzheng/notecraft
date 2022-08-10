import { createContext, Dispatch, SetStateAction } from "react"
import { possibleNoteDetailsStates } from "../../constants/noteDetails"

interface INoteDetailsTagContext {
  currentTagIndex: number
  isEditingTag: boolean
  isAddingTag: boolean
  isEditingSingleTag: boolean
  originalTag: string
  setCurrentTagIndex: Dispatch<SetStateAction<number>>
  setIsEditingTag: Dispatch<SetStateAction<boolean>>
  setIsAddingTag: Dispatch<SetStateAction<boolean>>
  setIsEditingSingleTag: Dispatch<SetStateAction<boolean>>
  setCurrentElementIndex: Dispatch<SetStateAction<number>>
  setOriginalTag: Dispatch<SetStateAction<string>>
  handleFinishAddingNewTag: () => void
  handleDeleteTag: (index: number) => void
  setNewTag: Dispatch<SetStateAction<string>>
  setCurrentNoteDetailsState: Dispatch<SetStateAction<possibleNoteDetailsStates>>
}
const NoteDetailsCurrentElementContext = createContext<INoteDetailsTagContext>({
  currentTagIndex: 0,
  isEditingTag: false,
  isAddingTag: false,
  isEditingSingleTag: false,
  originalTag: '',
  setCurrentTagIndex: () => {},
  setIsEditingTag: () => {},
  setIsAddingTag: () => {},
  setIsEditingSingleTag: () => {},
  setCurrentElementIndex: () => {},
  setOriginalTag: () => {},
  setCurrentNoteDetailsState: () => {},
  handleFinishAddingNewTag: () => {},
  handleDeleteTag: () => {},
  setNewTag: () => {}
})

interface Props extends INoteDetailsTagContext{
  children: React.ReactNode
}

const NoteDetailsCurrentElementContextProvider: React.FC<Props> = ({
  children,
  isEditingTag,
  isAddingTag,
  isEditingSingleTag,
  currentTagIndex,
  originalTag,
  setCurrentTagIndex,
  setOriginalTag,
  setIsEditingSingleTag,
  setIsAddingTag,
  setIsEditingTag,
  setCurrentElementIndex,
  setNewTag,
  setCurrentNoteDetailsState,
  handleFinishAddingNewTag,
  handleDeleteTag
}) => {
  return (
    <NoteDetailsCurrentElementContext.Provider value={{
      isAddingTag,
      isEditingTag,
      isEditingSingleTag,
      currentTagIndex,
      originalTag,
      setCurrentTagIndex,
      setIsEditingSingleTag,
      setIsAddingTag,
      setIsEditingTag,
      setCurrentElementIndex,
      setOriginalTag,
      setNewTag,
      setCurrentNoteDetailsState,
      handleFinishAddingNewTag,
      handleDeleteTag
    }}>
      {children}
    </NoteDetailsCurrentElementContext.Provider>
  )
}

export { NoteDetailsCurrentElementContext, NoteDetailsCurrentElementContextProvider }
