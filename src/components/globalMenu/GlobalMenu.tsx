import { observer } from "mobx-react"
import { useState } from "react"
import { menuFocusOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookList from "../notebookList/NotebookList"
import GlobalMenuItem from "./GlobalMenuItem"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

interface Props {
}

const GlobalMenu = observer(({}: Props) => {
  const [currentFocus, setCurrentFocus] = useState<menuFocusOptions>(menuFocusOptions.notesnippet)
  const globalNavigationStore = GlobalNavigationStore
  useGlobalMenuKeybind({
    globalNavigationStore,
    setCurrentFocus,
    currentFocus
  })
  function handleSnippetClick () {
    setCurrentFocus(menuFocusOptions.notesnippet)
  }
  function handleNotesHallClick () {
    setCurrentFocus(menuFocusOptions.noteshall)
  }
  return (
    <div className="justify-between flex flex-col h-full">
      <div className="space-y-4">
        <GlobalMenuItem
          isFocused={currentFocus === menuFocusOptions.notesnippet}
          onClick={handleSnippetClick}
        >
          Snippet
        </GlobalMenuItem>
        <GlobalMenuItem
          isFocused={currentFocus === menuFocusOptions.noteshall}
          onClick={handleNotesHallClick}
        >
          NotesHall
        </GlobalMenuItem>
        <NotebookList
          className={`${currentFocus === menuFocusOptions.notebooks ? 'text-blue-300' : ''}`}
          isFocused={currentFocus === menuFocusOptions.notebooks}
        />
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu