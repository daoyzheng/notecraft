import { IDirectoryItem } from "../../interfaces/note"
import { EmptyWrapper } from "./DirectoryTree.styled"

interface Props {
  directoryItems: IDirectoryItem[]
  selectedItem: IDirectoryItem|null
  onClick?: (item: IDirectoryItem) => void
  onExpandToggle?: (item: IDirectoryItem) => void
}
const DirectoryTree = ({ directoryItems, selectedItem, onClick, onExpandToggle }: Props) => {
  const handleExpandToggle = (item: IDirectoryItem) => {
    onExpandToggle && onExpandToggle(item)
  }
  const handleItemClick = (item: IDirectoryItem) => {
    onClick && onClick(item)
  }
  return (
    <ul>
      {
        directoryItems.map(item => {
          return (
            <li key={item.id}>
              <div className="flex">
                { selectedItem && selectedItem.id === item.id && <div className="bg-slate-700 fixed left-2 right-0 h-6 z-0"/>}
                <div className="z-10 flex items-center">
                  <i className={`material-symbols-outlined cursor-pointer ${!item.isFolder && 'text-transparent'}`}>{item.expand ? 'arrow_drop_down': 'arrow_right'}</i>
                  <i className={`material-symbols-outlined mr-1 text-zinc-500 ${item.expand && 'text-red-300'}`}>{ item.isFolder ? item.expand ? 'folder_open' : 'folder' : 'description'}</i>
                  <div className="cursor-pointer" onClick={() => handleItemClick(item)}>
                    { item.name }
                  </div>
                </div>
              </div>
              {
                item.children.length > 0 && item.expand
                ? <DirectoryTree directoryItems={item.children} selectedItem={selectedItem} onClick={handleItemClick}/>
                : item.isFolder && item.expand && <EmptyWrapper className="ml-12 italic text-sm">
                  empty
                </EmptyWrapper>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default DirectoryTree
