import { createContext, Dispatch, SetStateAction } from "react"

interface INoteDetailsTagContext {
  currentTagIndex: number
  isEditingTag: boolean
  isEditingSingleTag: boolean
  setCurrentTagIndex: Dispatch<SetStateAction<number>>
  setIsEditingTag: Dispatch<SetStateAction<boolean>>
  setIsEditingSingleTag: Dispatch<SetStateAction<boolean>>
  setCurrentElementIndex: Dispatch<SetStateAction<number>>
  handleEditTag: (tag: string, index: number) => void
}
const NoteDetailsCurrentElementContext = createContext<INoteDetailsTagContext>({
  currentTagIndex: 0,
  isEditingTag: false,
  isEditingSingleTag: false,
  setCurrentTagIndex: () => {},
  setIsEditingTag: () => {},
  setIsEditingSingleTag: () => {},
  setCurrentElementIndex: () => {},
  handleEditTag: () => {}
})

interface Props extends INoteDetailsTagContext{
  children: React.ReactNode
}

const NoteDetailsCurrentElementContextProvider: React.FC<Props> = ({
  children,
  isEditingTag,
  isEditingSingleTag,
  currentTagIndex,
  setCurrentTagIndex,
  setIsEditingSingleTag,
  setIsEditingTag,
  setCurrentElementIndex,
  handleEditTag
}) => {
  return (
    <NoteDetailsCurrentElementContext.Provider value={{
      isEditingTag,
      isEditingSingleTag,
      currentTagIndex,
      setCurrentTagIndex,
      setIsEditingSingleTag,
      setIsEditingTag,
      setCurrentElementIndex,
      handleEditTag
    }}>
      {children}
    </NoteDetailsCurrentElementContext.Provider>
  )
}

export { NoteDetailsCurrentElementContext, NoteDetailsCurrentElementContextProvider }
