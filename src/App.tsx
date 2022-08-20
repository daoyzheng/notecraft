import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import NotebookLanding from "./pages/notebook/NotebookLanding"
import NoteHall from "./pages/noteHall/NoteHall"
import routes from "./routes"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<NoteHall/>}/>
          <Route path={routes.notebooks} element={<NotebookLanding/>}/>
          <Route path={routes.noteshall} element={<NoteHall/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
