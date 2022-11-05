import { observer } from "mobx-react-lite"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import DirectoryTree from "../directoryTree/DirectoryTree"
import useNotebookListKeybind from "./NotebookListKeybind"

interface Props {
  notebookList: IDirectoryItem[]
  isActive: boolean
}
const NotebookList = observer(({ notebookList, isActive }: Props) => {
  const globalNavigationStore = GlobalNavigationStore
  useNotebookListKeybind({
    globalNavigationStore,
    isActive
  })
  return (
    <DirectoryTree directoryItems={notebookList}/>
  )
})

export default NotebookList
