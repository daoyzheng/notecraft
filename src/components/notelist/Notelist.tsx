interface Props {
  className: string
}
const noteLists = [
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  },
  {
    title: 'How to create markdown file',
    date: '2020-06-14'
  }
]
const Notelist = ({ className } : Props) => {
  return (
    <div className={className}>
      notelist
    </div>
  )
}

export default Notelist
