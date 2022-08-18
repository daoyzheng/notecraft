import { FC } from "react"

interface Props {
  className?: string
  children: React.ReactNode
  isFocused: boolean
  onClick?: () => void
}
const GlobalMenuItem: FC<Props> = ({className, children, isFocused, onClick}) => {
  function handleOnClick () {
    onClick && onClick()
  }
  return (
    <div className={`${className}`}>
      <div className={`${isFocused ? 'text-blue-300' : ''} cursor-pointer hover:text-blue-300`} onClick={handleOnClick}>
        {children}
      </div>
    </div>
  )
}

export default GlobalMenuItem