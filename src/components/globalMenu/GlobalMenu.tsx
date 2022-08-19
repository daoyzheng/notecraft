import { observer } from "mobx-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { menuFocusOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookList from "../notebookList/NotebookList"
import GlobalMenuItem from "./GlobalMenuItem"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

interface Props {
}

const GlobalMenu = observer(({}: Props) => {
  const [currentFocus, setCurrentFocus] = useState<menuFocusOptions>(menuFocusOptions.noteshall)
  const globalNavigationStore = GlobalNavigationStore
  useGlobalMenuKeybind({
    globalNavigationStore,
    currentFocus,
    setCurrentFocus,
  })
  function handleNotebookClick () {
    setCurrentFocus(menuFocusOptions.notebooks)
  }
  function handleNotesHallClick () {
    setCurrentFocus(menuFocusOptions.noteshall)
  }
  return (
    <div className="justify-between flex flex-col h-full">
      <div>
        <GlobalMenuItem
          isFocused={currentFocus === menuFocusOptions.noteshall}
          onClick={handleNotesHallClick}
        >
          <Link to="/noteshall">Notes Hall</Link>
        </GlobalMenuItem>
        <div className="flex flex-row items-center mt-3 mb-1">
          <GlobalMenuItem
            isFocused={currentFocus === menuFocusOptions.notebooks}
            onClick={handleNotebookClick}
          >
            <Link to="/noteshall">Notebooks</Link>
          </GlobalMenuItem>
          <i className={`${currentFocus === menuFocusOptions.notebooks ? 'text-blue-300' : ''} material-icons-outlined text-sm cursor-pointer`}>add_circle_outline</i>
        </div>
        <NotebookList />
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu