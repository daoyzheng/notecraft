import { observer } from "mobx-react"
import { Outlet } from "react-router-dom"
import GlobalMenu from "../components/globalMenu/GlobalMenu"
import useKeybindingHints from "../hooks/useKeybindingHints"
import GlobalNavigationStore from "../store/GlobalNavigationStore"

const HomeLayout: React.FC = observer(() => {
  const globalNavigationStore = GlobalNavigationStore
  const { isInGlobalMenu } = globalNavigationStore
  function handleEnterMenu() {
    globalNavigationStore.setToMenuNavigation()
  }
  const { getKeybindingHints } = useKeybindingHints()
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <header
        className={`${isInGlobalMenu ? 'border-blue-500' : 'border-transparent'} bg-zinc-900 col-span-2 text-white pt-4 px-2 border`}
        onMouseEnter={handleEnterMenu} >
        <GlobalMenu />
      </header>
      <main className="col-span-10 overflow-hidden relative">
        <Outlet />
        <div className="absolute w-full bottom-0 bg-zinc-700 text-white flex items-center gap-x-4 px-2">
          {getKeybindingHints()}
        </div>
      </main>
    </div>
  )
})

export default HomeLayout