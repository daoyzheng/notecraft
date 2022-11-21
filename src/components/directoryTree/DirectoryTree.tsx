import { IDirectoryItem } from "../../interfaces/note"

interface Props {
  directoryItems: IDirectoryItem[]
  selectedItem: IDirectoryItem|null
}
const DirectoryTree = ({ directoryItems, selectedItem }: Props) => {
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
                  <i className="material-symbols-outlined mr-1 text-zinc-500">{ item.isFolder ? item.expand ? 'folder_open' : 'folder' : 'description'}</i>
                  { item.name }
                </div>
              </div>
              {
                item.children.length > 0 && item.expand
                ? <DirectoryTree directoryItems={item.children} selectedItem={selectedItem}/>
                : item.isFolder && item.expand && <div className="ml-12 italic text-sm text-zinc-500">
                  empty
                </div>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default DirectoryTree
