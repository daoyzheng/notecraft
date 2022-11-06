import { observer } from "mobx-react-lite"
import { useState } from "react"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import DirectoryTree from "../directoryTree/DirectoryTree"
import useNotebookListKeybind from "./NotebookListKeybind"

interface Props {
  notebookList: IDirectoryItem[]
  isActive: boolean
}
const NotebookList = observer(({ notebookList, isActive }: Props) => {
  const [selectedItem, setSelectedItem] = useState<IDirectoryItem|null>(null)
  const globalNavigationStore = GlobalNavigationStore
  const notebookListStore = NotebookListStore
  useNotebookListKeybind({
    notebookListStore,
    notebookList,
    selectedItem,
    setSelectedItem,
    globalNavigationStore,
    isActive
  })
  return (
    <DirectoryTree directoryItems={notebookList} selectedItem={selectedItem}/>
  )
})

export default NotebookList
