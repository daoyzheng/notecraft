import { KeyboardEvent, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
        <ReactMarkdown children={doc} remarkPlugins={[remarkGfm]}/> :
        (showPlaceholder &&
        <div className="italic text-sm text-zinc-300">Add Note</div>)
      }
    </div>
  )
}

export default Preview