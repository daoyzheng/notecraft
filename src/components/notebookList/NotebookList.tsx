import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import DirectoryTree from "../directoryTree/DirectoryTree"
import useNotebookListKeybind from "./NotebookListKeybind"

interface Props {
  notebookList: IDirectoryItem[]
}
const NotebookList = observer(({ notebookList }: Props) => {
  const { currentItem, setCurrentItem, getItem, setSelectedNotebook } = NotebookListStore
  const globalNavigationStore = GlobalNavigationStore
  const notebookListStore = NotebookListStore
  const { itemId } = useParams()
  useEffect(() => {
    if (globalNavigationStore.currentFocusedPage === menuOptions.notebookList && !currentItem) {
      setCurrentItem(notebookList[0])
    }
  }, [globalNavigationStore.currentFocusedPage])
  useEffect(() => {
    if (itemId) {
      const item = getItem(notebookList, Number(itemId))
      setCurrentItem(item)
      if (!item?.isFolder) {
        setSelectedNotebook(item)
      }
    }
  }, [])
  const handleItemClick = (item: IDirectoryItem) => {
    if (!item.isFolder) {
      setSelectedNotebook(item)
    }
    setCurrentItem(item)
  }
  useNotebookListKeybind({
    notebookListStore,
    notebookList,
    currentItem,
    setCurrentItem,
    globalNavigationStore
  })
  return (
    <DirectoryTree directoryItems={notebookList} selectedItem={currentItem} onClick={handleItemClick}/>
  )
})

export default NotebookList
