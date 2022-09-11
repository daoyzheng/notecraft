import { createContext, Dispatch, FC, ReactNode, SetStateAction } from "react"
import { INotebook } from "../../interfaces/note"

interface INotebookListContext {
  setCurrentNotebooks: Dispatch<SetStateAction<INotebook[]>>
}

const NotebookListContext = createContext<INotebookListContext>({
  setCurrentNotebooks: () => {}
})

interface Props extends INotebookListContext {
  children: ReactNode
}

const NotebookListContextProvider: FC<Props> = ({
  children,
  setCurrentNotebooks
}) => {
  return (
    <NotebookListContext.Provider value={{
      setCurrentNotebooks
    }}>
      {children}
    </NotebookListContext.Provider>
  )
}

export { NotebookListContext, NotebookListContextProvider }