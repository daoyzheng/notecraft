import InputHint from "../../components/inputHint/InputHint"
import { possibleNoteDetailsStates, focusOptions } from "../../constants/noteDetails"
import { INote } from "../../interfaces/note"

interface Props {
  currentNoteDetailsState: possibleNoteDetailsStates
  currentFocus: focusOptions
  currentNote: INote|null
  isInGlobalMenu: boolean
}
const useNoteDetailsHints = ({ currentNoteDetailsState, currentFocus, isInGlobalMenu, currentNote }: Props) => {
  function getKeybindingHints () {
    if (isInGlobalMenu) return
    if (currentFocus === focusOptions.notelist) return <NotelistKeyHints/>
    else if (currentNote) {
      switch(currentNoteDetailsState) {
        case possibleNoteDetailsStates.navigating: {
          return <NoteDetailsNavigatingHints/>
        }
        case possibleNoteDetailsStates.editingTitle: {
          return <NoteDetailsEditingTitleHints/>
        }
        case possibleNoteDetailsStates.editingTag: {
          return <NoteDetailsEditingTagHints/>
        }
        case possibleNoteDetailsStates.editingSingleTag: {
          return <NoteDetailsEditingSingleTagHints/>
        }
        case possibleNoteDetailsStates.editingBody: {
          return <NoteDetailsEditingBodyHints/>
        }
      }
    }
  }
  return {
    getKeybindingHints
  }
}

export default useNoteDetailsHints

const NotelistKeyHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="i"/>
        <div className="ml-1 text-xs">: New Note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="l"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_right"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit Note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev note</div>
      </div>
    </>
  )
}

const NoteDetailsNavigatingHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="i"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="h"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_left"/>
        <div className="ml-1 text-xs">: Return to notes selection</div>
      </div>
    </>
  )
}

const NoteDetailsEditingTitleHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Save title</div>
      </div>
    </>
  )
}

const NoteDetailsEditingTagHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="l"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_right"/>
        <div className="ml-1 text-xs">: Next tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="h"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_left"/>
        <div className="ml-1 text-xs">: Prev tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="i"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="x"/><span className="mx-1">/</span><InputHint label="Del"/>
        <div className="ml-1 text-xs">: Delete tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
    </>
  )
}

const NoteDetailsEditingSingleTagHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Save tag</div>
      </div>
    </>
  )
}

const NoteDetailsEditingBodyHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Save doc</div>
      </div>

    </>
  )
}