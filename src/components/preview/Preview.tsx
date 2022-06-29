import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  className?: string
  doc: string
}
const Preview: React.FC<Props> = ({ className, doc }) => {
  return (
    <div className="break-words">
      <ReactMarkdown children={doc} remarkPlugins={[remarkGfm]}/>
    </div>
  )
}

export default Preview