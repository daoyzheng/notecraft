import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { languages } from '@codemirror/language-data'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import type React from 'react'

const highlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
])

const theme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%'
  },
  '.cm-gutters': {
    backgroundColor: 'transparent !important'
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: 'white'
  },
  ".cm-content": {
    color: 'white'
  },
}, {dark: true})

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
        basicSetup,
        oneDark,
        theme,
        syntaxHighlighting(highlightStyle),
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


