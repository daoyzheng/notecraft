import Notelist from "../../components/notelist/Notelist"

const Notebook = () => {
  function handleCreateNewNote () {
    console.log('here')
  }
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist className="col-span-3" onCreateNewNote={handleCreateNewNote}/>
      <div className="col-span-7 bg-red-500">Note details</div>
    </div>
  )
}

export default Notebook