import { observer } from "mobx-react"
import { useState } from "react"
import { menuFocusOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookList from "../notebookList/NotebookList"
import NoteSnippet from "../noteSnippet/NoteSnippet"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

interface Props {
}
const GlobalMenu = observer(({}: Props) => {
  const [currentFocus, setCurrentFocus] = useState<menuFocusOptions>(menuFocusOptions.notesnippet)
  const globalNavigationStore = GlobalNavigationStore
  useGlobalMenuKeybind({
    globalNavigationStore
  })
  return (
    <div className="justify-between flex flex-col h-full">
      <div className="space-y-4">
        <NoteSnippet className={`${currentFocus === menuFocusOptions.notesnippet ? 'text-blue-300' : ''} hover:text-blue-300 cursor-pointer`}/>
        <NotebookList
          className={`${currentFocus === menuFocusOptions.notebooks ? 'text-blue-300' : ''}`}
          isActive={currentFocus === menuFocusOptions.notebooks}
        />
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu