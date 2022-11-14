import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
  const { currentFocusedPage } = GlobalNavigationStore
  const { currentItem, setCurrentItem } = NotebookListStore
  useEffect(() => {
    if (currentFocusedPage === menuOptions.notebookList && !currentItem) {
      const firstItem = notebookList.length > 0 ? notebookList[0] : null
      setCurrentItem(firstItem)
      if (firstItem)
        navigate(`${routes.notebooks}/${firstItem.id}`)
    }
  }, [currentFocusedPage, currentItem])
  const globalNavigationStore = GlobalNavigationStore
  const notebookListStore = NotebookListStore
  useNotebookListKeybind({
    notebookListStore,
    notebookList,
    currentItem,
    setCurrentItem,
    globalNavigationStore
  })
  return (
    <DirectoryTree directoryItems={notebookList} selectedItem={currentItem}/>
  )
})

export default NotebookList
