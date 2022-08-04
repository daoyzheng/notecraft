import React, { createContext, Dispatch, SetStateAction } from "react";
import { possibleNoteDetailsStates } from "../../constants/noteDetails";

interface INoteDetailsStateContext {
  setCurrentNoteDetailsState: Dispatch<SetStateAction<possibleNoteDetailsStates>>
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


