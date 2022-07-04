import { useCallback, useEffect, useState } from 'react'
import useCodeMirror from '../../hooks/useCodeMirror'
import { EditorState } from '@codemirror/state'

interface Props {
  docKey: string
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = ({ onChange, initialDoc, docKey }) => {
  const handleChange = useCallback((state: EditorState) => onChange(state.doc.toString()), [onChange])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    docKey: docKey,
    initialDoc: initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      // do nothing for now
    }
  }, [editorView])
  return (
    <>
      {/* <div>DOC: {initialDoc}</div> */}
      <div ref={refContainer} className="h-96"/>
    </>
  )
}

export default Editor