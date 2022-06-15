import { Outlet } from "react-router-dom"

const HomeLayout: React.FC = () => {
  return (
    <div className="bg-yellow-300 grid grid-cols-12 h-screen w-screen">
      <header className="bg-red-300 col-span-2">
        Header
      </header>
      <main className="col-span-10">
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout