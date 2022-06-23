import NoteDetails from "../../components/noteDetails/NoteDetails"
import Notelist from "../../components/notelist/Notelist"

const Notebook = () => {
  function handleCreateNewNote () {
    console.log('here')
  }
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist className="col-span-3 border-r border-gray-500" onCreateNewNote={handleCreateNewNote}/>
      <NoteDetails className="col-span-7" />
    </div>
  )
}

export default Notebook