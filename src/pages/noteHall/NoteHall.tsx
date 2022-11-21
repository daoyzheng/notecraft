import { observer } from "mobx-react"
import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import useNoteHallKeybind from "./useNoteHallKeybind"

const NoteHall = observer(() => {
  const { currentFocusedPage, isInGlobalMenu, setToPageNavigation, setCurrentFocusedPage } = GlobalNavigationStore
  useNoteHallKeybind({
    globalNavigationStore: GlobalNavigationStore
  })
  function handleEnterNotehall () {
    setToPageNavigation()
    setCurrentFocusedPage(menuOptions.noteshall)
  }
  return (
    <div 
      onMouseEnter={handleEnterNotehall} 
      className={`${!isInGlobalMenu && currentFocusedPage === menuOptions.noteshall ? 'border-blue-500 border' : ''} h-full w-full relative bg-zinc-800 text-white`}>
      Notes Hall
    </div>
  )
})
export default NoteHall