import { observer } from "mobx-react"
import { Outlet } from "react-router-dom"
import GlobalMenu from "../components/globalMenu/GlobalMenu"
import GlobalNavigationStore from "../store/GlobalNavigationStore"

const HomeLayout: React.FC = observer(() => {
  const globalNavigationStore = GlobalNavigationStore
  const { isInGlobalMenu } = globalNavigationStore
  function handleEnterMenu() {
    globalNavigationStore.setToGlobalNavigation()
  }
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <header
        className={`${isInGlobalMenu ? 'border-blue-500' : 'border-transparent'} bg-zinc-900 col-span-2 text-white pt-4 px-2  border`}
        onMouseEnter={handleEnterMenu} >
        <GlobalMenu />
      </header>
      <main className="col-span-10 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
})

export default HomeLayout