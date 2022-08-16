import { observer } from "mobx-react"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookList from "./NotebookList"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

interface Props {
}
const GlobalMenu = observer(({}: Props) => {
  const globalNavigationStore = GlobalNavigationStore
  useGlobalMenuKeybind({
    globalNavigationStore
  })
  return (
    <>
      <NotebookList />
      <div>
        Dao Zheng
      </div>
    </>
  )
})

export default GlobalMenu