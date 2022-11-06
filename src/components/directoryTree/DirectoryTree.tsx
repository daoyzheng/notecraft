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
              <div className="flex items-center">
                <i className="material-symbols-outlined cursor-pointer">arrow_right</i>
                <i className="material-symbols-outlined mr-1 text-zinc-500">{ item.isFolder ? item.expand ? 'folder_open' : 'folder' : 'description'}</i>
                { item.name }
                {
                  selectedItem && selectedItem.id === item.id &&
                  <i className="material-icons-outlined">arrow_left</i>
                }
              </div>
              {
                item.children.length > 0 && 
                <DirectoryTree directoryItems={item.children} selectedItem={selectedItem}/>
              }
            </li>
          )           
        }) 
      }
    </ul>
  )
}

export default DirectoryTree
