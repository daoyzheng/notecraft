import { observer } from "mobx-react"
import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import useNotebookLandingKeybind from "./useNotebookLandingKeybind"

const NotebookLanding = observer(() => {
  const { currentFocusedPage, isInGlobalMenu, setToPageNavigation, setCurrentFocusedPage } = GlobalNavigationStore
  useNotebookLandingKeybind({
    globalNavigationStore: GlobalNavigationStore
  })
  function handleMouseEnter () {
    setToPageNavigation()
  }
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className={`${!isInGlobalMenu 
        && (currentFocusedPage === menuOptions.notebookLanding || currentFocusedPage === menuOptions.notebookList) ? 'border-blue-500 border' : ''} h-full w-full relative bg-zinc-800 text-white`}>
      Notebooklanding
    </div>
  )
})

export default NotebookLanding