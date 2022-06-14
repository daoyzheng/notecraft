import { useCallback, useState } from "react"
import Editor from "./components/Editor"

function App() {
  const [doc, setDoc] = useState<string>('# hello world')

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])
  return (
    <div>
      Home
      <Editor onChange={handleDocChange} initialDoc={doc}/>
    </div>
  )
}

export default App
