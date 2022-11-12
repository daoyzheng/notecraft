import { FC, MouseEvent, useCallback } from "react"
import { GlobalMenuItemIconWrapper } from "./GlobalMenuItem.styled"

interface Props {
  className?: string
  children: React.ReactNode
  isFocused: boolean
  onClick?: () => void
}
const GlobalMenuItem: FC<Props> = ({className, children, isFocused, onClick}) => {
  const handleOnClick = useCallback((e: MouseEvent) => {
    onClick && onClick()
  }, [onClick])
  return (
    <div className={`${className} flex flex-row items-center w-full gap-x-2 z-0`}>
      <div className={`${isFocused ? 'text-blue-300' : ''} cursor-pointer hover:text-blue-300`} onClick={handleOnClick}>
        {children}
      </div>
      {
        isFocused ?
        <GlobalMenuItemIconWrapper>
          <img src="/src/assets/icons/spiderman_icon.svg" alt="spiderman_blinker" width="24"/>
        </GlobalMenuItemIconWrapper> :
        // <GlobalMenuItemIconWrapper
        //   className={`material-icons-outlined text-sm ${isFocused ? 'text-blue-300' : ''}`}
        // >keyboard_double_arrow_left</GlobalMenuItemIconWrapper> :
        <></>
      }
    </div>
  )
}

export default GlobalMenuItem
