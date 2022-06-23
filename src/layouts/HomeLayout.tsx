import { Outlet } from "react-router-dom"

const HomeLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <header className="bg-zinc-900 col-span-2 text-white pt-4 px-2 justify-between flex flex-col">
        <div>
          <div>Notebooks</div>
          <div className="ml-4 space-y-1 mt-1">
            <div>NoteBook1</div>
            <div>NoteBook2</div>
            <div>NoteBook3</div>
            <div>NoteBook4</div>
            <div>NoteBook5</div>
            <div>NoteBook6</div>
            <div>NoteBook7</div>
          </div>
        </div>
        <div>
          Dao Zheng
        </div>
      </header>
      <main className="col-span-10">
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout