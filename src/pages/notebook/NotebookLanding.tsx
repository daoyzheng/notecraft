import { observer } from "mobx-react"
import { menuOptions } from "../../constants/globalMenu"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"

const NotebookLanding = observer(() => {
  const { currentFocusedPage, isInGlobalMenu } = GlobalNavigationStore
  return (
    <div className={`${!isInGlobalMenu && currentFocusedPage === menuOptions.notebookLanding ? 'border-blue-500 border' : ''} h-full w-full relative bg-zinc-800 text-white`}>
      Notebooklandinga
    </div>
  )
})

export default NotebookLanding