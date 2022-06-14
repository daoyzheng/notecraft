import { useCallback, useEffect } from 'react'
import useCodeMirror from '../hooks/useCodeMirror'

interface Props {

}

const Editor: React.FC<Props> = (props) => {
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: 'HELLO WORLD',
    onChange: () => {}
  })

  useEffect(() => {
    if (editorView) {
      // do nothing for now
    }
  }, [editorView])
  return <div ref={refContainer}>Editor</div>
}

export default Editor