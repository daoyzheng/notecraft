import { createContext, Dispatch, SetStateAction } from "react"

interface INoteDetailsTagContext {
  currentTagIndex: number
  isEditingTag: boolean
  isEditingSingleTag: boolean
  setCurrentTagIndex: Dispatch<SetStateAction<number>>
  setIsEditingTag: Dispatch<SetStateAction<boolean>>
  setIsEditingSingleTag: Dispatch<SetStateAction<boolean>>
}
const NoteDetailsCurrentElementContext = createContext<INoteDetailsTagContext>({
  currentTagIndex: 0,
  isEditingTag: false,
  isEditingSingleTag: false,
  setCurrentTagIndex: () => {},
  setIsEditingTag: () => {},
  setIsEditingSingleTag: () => {}
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
  setIsEditingTag
}) => {
  return (
    <NoteDetailsCurrentElementContext.Provider value={{
      isEditingTag,
      isEditingSingleTag,
      currentTagIndex,
      setCurrentTagIndex,
      setIsEditingSingleTag,
      setIsEditingTag
    }}>
      {children}
    </NoteDetailsCurrentElementContext.Provider>
  )
}

export { NoteDetailsCurrentElementContext, NoteDetailsCurrentElementContextProvider }
