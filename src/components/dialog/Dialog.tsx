import { FC, ReactNode, RefObject, useRef } from "react"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"

interface Props {
  children: ReactNode
  className: string
  exception: RefObject<Element>
  onBlur?: () => void
}

const Dialog: FC<Props> = ({ children, className, onBlur, exception }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  function handleClickOutside () {
    onBlur && onBlur()
  }
  useOutsideAlerter({
    ref: popupRef,
    exception,
    onClickOutside: handleClickOutside
  })
  return (
    <div ref={popupRef} className={className}>
      {children}
    </div>
  )
}

export default Dialog