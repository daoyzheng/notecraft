import { KeyboardEvent, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  className?: string
  doc: string
  onClick?: () => void
}
const Preview: React.FC<Props> = ({ className, doc, onClick }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])
  return (
    <div className={`${className} break-words`} onClick={handleOnClick}>
      <ReactMarkdown children={doc} remarkPlugins={[remarkGfm]}/>
    </div>
  )
}

export default Preview