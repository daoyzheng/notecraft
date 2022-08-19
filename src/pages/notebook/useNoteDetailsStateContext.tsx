import React, { createContext, Dispatch, SetStateAction } from "react";
import { possibleNoteDetailsStates } from "../../constants/noteDetails";

interface INoteDetailsStateContext {
  setCurrentNoteDetailsState: (noteDetailsState: possibleNoteDetailsStates) => void
}

const NoteDetailsStateContext = createContext<INoteDetailsStateContext>({
  setCurrentNoteDetailsState: () => {}
})

interface Props extends INoteDetailsStateContext {
  children: React.ReactNode
}

const NoteDetailsStateContextProvider: React.FC<Props> = ({
  children,
  setCurrentNoteDetailsState
}) => {
  return (
    <NoteDetailsStateContext.Provider value={{
      setCurrentNoteDetailsState
    }}>
      {children}
    </NoteDetailsStateContext.Provider>
  )
}

export { NoteDetailsStateContextProvider, NoteDetailsStateContext }


