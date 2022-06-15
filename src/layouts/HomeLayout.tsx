import { ReactNode } from "react"
import { Outlet } from "react-router-dom"

const HomeLayout: React.FC = () => {
  return (
    <div>
      <header>
        Hello
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout