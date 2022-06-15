import Notelist from "../../components/notelist/Notelist"

const Notebook = () => {
  return (
    <div className="grid grid-cols-10 h-full w-full">
      <Notelist className="col-span-3 bg-green-300"/>
      <div className="col-span-7 bg-red-500">Note details</div>
    </div>
  )
}

export default Notebook