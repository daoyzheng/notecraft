import { useCallback, useEffect } from 'react'
import useCodeMirror from '../hooks/useCodeMirror'
import { EditorState } from '@codemirror/state'

interface Props {
  initialDoc: string,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = ({ onChange, initialDoc }) => {
  const handleChange = useCallback((state: EditorState) => onChange(state.doc.toString()), [onChange])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      // do nothing for now
    }
  }, [editorView])
  return <div ref={refContainer}/>
}

export default Editor