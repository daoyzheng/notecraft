import { IDirectoryItem } from "../../interfaces/note"

interface Props {
  directoryItems: IDirectoryItem[]
}
const DirectoryTree = ({ directoryItems }: Props) => {
  return (
    <ul>
      {
        directoryItems.map(item => {
          return (
            <li key={item.id}>
              { item.name }
              {
                item.children.length > 0 && 
                <DirectoryTree directoryItems={item.children} />
              }
            </li>
          )           
        }) 
      }
    </ul>
  )
}

export default DirectoryTree
