import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

const NotebookLanding = () => {
  const { currentFocusedPage, isInGlobalMenu } = GlobalNavigationStore
  return (
    <div className={`${!isInGlobalMenu && currentFocusedPage == menuOptions.notebookLanding ? 'border-blue-500' : ''} h-full w-full relative bg-zinc-800 text-white border border-blue-500`}>
      Notebooklanding
    </div>
  )
}

export default NotebookLanding