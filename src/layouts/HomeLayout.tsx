import { Outlet } from "react-router-dom"

const HomeLayout: React.FC = () => {
  return (
    <div>
      <header className="bg-red-300">
        Hello
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout