import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Error from "./pages/error/Error"

function App() {
  // const [doc, setDoc] = useState<string>('# hello world')

  // const handleDocChange = useCallback((newDoc: string) => {
  //   setDoc(newDoc)
  // }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout/>}/>
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/> */}
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
