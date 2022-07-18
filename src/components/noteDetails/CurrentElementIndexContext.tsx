import { createContext, Dispatch, SetStateAction } from "react"

interface INoteDetailsCurrentElementContext {
  currentElementIndex: number
  setCurrentElementIndex: Dispatch<SetStateAction<number>>
}
const NoteDetailsCurrentElementContext = createContext<INoteDetailsCurrentElementContext>({
  currentElementIndex: 0,
  setCurrentElementIndex: () => {}
})

interface Props {
  children: React.ReactNode
  currentElementIndex: number
  setCurrentElementIndex: Dispatch<SetStateAction<number>>
}

const NoteDetailsCurrentElementContextProvider: React.FC<Props> = ({ children, currentElementIndex, setCurrentElementIndex }) => {
  return (
    <NoteDetailsCurrentElementContext.Provider value={{currentElementIndex, setCurrentElementIndex}}>
      {children}
    </NoteDetailsCurrentElementContext.Provider>
  )
}

export { NoteDetailsCurrentElementContext, NoteDetailsCurrentElementContextProvider }
