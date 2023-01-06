import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem } from "../../interfaces/note"
import routes from "../../routes"
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
  const navigate = useNavigate()
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
      navigate(`${routes.notebooks}/${item.id}`)
    }
    setCurrentItem(item)
    globalNavigationStore.setCurrentFocusedPage(menuOptions.notebookList)
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
