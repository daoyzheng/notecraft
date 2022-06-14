import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'

const Editor: React.FC = () => {
  const startState = EditorState.create({
    doc: 'Hello World',
    extensions: [keymap.of(defaultKeymap)]
  })

  const view = new EditorView({
    state: startState,
    parent: document.body
  })
  return <div>Editor</div>
}

export default Editor