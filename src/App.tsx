import { observer } from "mobx-react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import Notebook from "./pages/notebook/Notebook"
import NotebookLanding from "./pages/notebook/NotebookLanding"
import NoteHall from "./pages/noteHall/NoteHall"
import routes from "./routes"
// import NotebookStore from "./store/NotebookStore"

const App = observer(() => {
  // const { currentNotebook } = NotebookStore
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<NoteHall/>}/>
          <Route path={routes.notebooks}>
            <Route path="" element={<NotebookLanding/>}/>
            <Route path=":itemId" element={<Notebook/>}/>
          </Route>
          <Route path={routes.noteshall} element={<NoteHall/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
})

export default App
