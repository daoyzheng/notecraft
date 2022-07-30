import { createContext, Dispatch, SetStateAction } from "react"

interface INoteDetailsTagContext {
  currentTagIndex: number
  isEditingTag: boolean
  isAddingTag: boolean
  isEditingSingleTag: boolean
  setCurrentTagIndex: Dispatch<SetStateAction<number>>
  setIsEditingTag: Dispatch<SetStateAction<boolean>>
  setIsAddingTag: Dispatch<SetStateAction<boolean>>
  setIsEditingSingleTag: Dispatch<SetStateAction<boolean>>
  setCurrentElementIndex: Dispatch<SetStateAction<number>>
  handleFinishAddingNewTag: () => void
  handleDeleteTag: (index: number) => void
  setNewTag: Dispatch<SetStateAction<string>>
}
const NoteDetailsCurrentElementContext = createContext<INoteDetailsTagContext>({
  currentTagIndex: 0,
  isEditingTag: false,
  isAddingTag: false,
  isEditingSingleTag: false,
  setCurrentTagIndex: () => {},
  setIsEditingTag: () => {},
  setIsAddingTag: () => {},
  setIsEditingSingleTag: () => {},
  setCurrentElementIndex: () => {},
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
  setCurrentTagIndex,
  setIsEditingSingleTag,
  setIsAddingTag,
  setIsEditingTag,
  setCurrentElementIndex,
  setNewTag,
  handleFinishAddingNewTag,
  handleDeleteTag
}) => {
  return (
    <NoteDetailsCurrentElementContext.Provider value={{
      isAddingTag,
      isEditingTag,
      isEditingSingleTag,
      currentTagIndex,
      setCurrentTagIndex,
      setIsEditingSingleTag,
      setIsAddingTag,
      setIsEditingTag,
      setCurrentElementIndex,
      setNewTag,
      handleFinishAddingNewTag,
      handleDeleteTag
    }}>
      {children}
    </NoteDetailsCurrentElementContext.Provider>
  )
}

export { NoteDetailsCurrentElementContext, NoteDetailsCurrentElementContextProvider }
