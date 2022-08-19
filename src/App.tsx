import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import Notebook from "./pages/notebook/Notebook"
import NoteHall from "./pages/noteHall/NoteHall"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<NoteHall/>}/>
          <Route path="/notebooks" element={<Notebook/>}/>
          <Route path="/noteshall" element={<NoteHall/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
