import { useCallback, useEffect, useState } from 'react'
import useCodeMirror from '../../hooks/useCodeMirror'
import { EditorState } from '@codemirror/state'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'

interface Props {
  docKey: string
  initialDoc: string
  onChange: (doc: string) => void
  onBlur?: () => void
}

const Editor: React.FC<Props> = ({ onChange, initialDoc, docKey, onBlur }) => {
  const handleChange = useCallback((state: EditorState) => onChange(state.doc.toString()), [onChange])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    docKey: docKey,
    initialDoc: initialDoc,
    onChange: handleChange
  })

  const handleClickOutside = useCallback(() => {
    onBlur && onBlur()
  }, [onBlur])

  useOutsideAlerter({
    ref: refContainer,
    onClickOutside: handleClickOutside
  })


  useEffect(() => {
    if (editorView) {
      editorView.focus()
      // do nothing for now
    }
  }, [editorView])
  return (
    <>
      {/* <div>DOC: {initialDoc}</div> */}
      <div ref={refContainer} className="h-fit"/>
    </>
  )
}

export default Editor