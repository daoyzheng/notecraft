import { observer } from "mobx-react"
import { Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import Notebook from "./pages/notebook/Notebook"
import NotebookLanding from "./pages/notebook/NotebookLanding"
import NoteHall from "./pages/noteHall/NoteHall"
import routes from "./routes"
import NotebookListStore from "./store/NotebookListStore"
// import NotebookStore from "./store/NotebookStore"

const App = observer(() => {
  const { itemId } = useParams()
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<NoteHall/>}/>
          <Route path={routes.notebooks} element={!itemId && <NotebookLanding/>}/>
          <Route path={`${routes.notebooks}/:itemId`} element={<Notebook/>}/>
          <Route path={routes.noteshall} element={<NoteHall/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
})

export default App
