import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"
import Notebook from "./pages/notebook/Notebook"

function App() {
  // const [doc, setDoc] = useState<string>('# hello world')

  // const handleDocChange = useCallback((newDoc: string) => {
  //   setDoc(newDoc)
  // }, [])
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" />
          <Route path="/notebook" element={<Notebook/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
