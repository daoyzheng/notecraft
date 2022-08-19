import { FC } from "react"
import { GlobalMenuItemIconWrapper } from "./GlobalMenuItem.styled"

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
    <div className={`${className} flex flex-row items-center w-full gap-x-2`}>
      <div className={`${isFocused ? 'text-blue-300' : ''} cursor-pointer hover:text-blue-300`} onClick={handleOnClick}>
        {children}
      </div>
      {
        isFocused ?
        <GlobalMenuItemIconWrapper
          className={`material-icons-outlined text-sm cursor-pointer ${isFocused ? 'text-blue-300' : ''}`}
        >keyboard_double_arrow_left</GlobalMenuItemIconWrapper> :
        <></>
      }
    </div>
  )
}

export default GlobalMenuItem