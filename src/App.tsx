import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import Notebook from "./pages/notebook/Notebook"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" />
          <Route path="/notebooks" element={<Notebook/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
