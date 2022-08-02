import { useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  className?: string
  doc: string
  showPlaceholder?: boolean
  onClick?: () => void
}
const Preview: React.FC<Props> = ({ className, doc, showPlaceholder, onClick }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])
  return (
    <div className={`${className} break-words`} onClick={handleOnClick}>
      {
        doc ?
        <ReactMarkdown
          children={doc}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        /> :
        (showPlaceholder &&
        <div className="italic text-sm">Add Note</div>)
      }
    </div>
  )
}

export default Preview
