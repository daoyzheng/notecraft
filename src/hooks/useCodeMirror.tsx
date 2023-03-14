import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { languages } from '@codemirror/language-data'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { vim } from '@replit/codemirror-vim'
// import {defaultKeymap, historyKeymap, history} from "@codemirror/commands"
// import { keymap } from "@codemirror/view"
import type React from 'react'

const highlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
])

const lineWrap = EditorView.lineWrapping

const theme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
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
  docKey: string
  initialDoc: string
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(props : Props) : [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange, docKey } = props

  useEffect(() => {
    if (!refContainer.current) return
    const startState = CreateEditorState()
    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)
    return () => view.destroy()
  }, [refContainer])

  useEffect(() => {
    if (docKey) {
      const startState = CreateEditorState()
      editorView?.setState(startState)
    }
  }, [docKey])

  function CreateEditorState () {
    return EditorState.create({
      doc: props.initialDoc,
      extensions: [
        vim(),
        basicSetup,
        oneDark,
        theme,
        lineWrap,
        // keymap.of([
        //   ...defaultKeymap
        // ]),
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
  }

  return [refContainer, editorView]
}


export default useCodeMirror


