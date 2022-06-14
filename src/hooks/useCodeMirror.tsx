import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import type React from 'react'

interface Props {
  initialDoc: string,
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(props : Props) : [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of(defaultKeymap),
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        })
      ],
    })
    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)
  }, [refContainer])

  return [refContainer, editorView]
}

export default useCodeMirror


