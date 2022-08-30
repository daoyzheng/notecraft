import { RefObject, useEffect } from "react"

interface Props {
  ref: RefObject<Element>
  exception: RefObject<Element>
  onClickOutside: () => void
}
const useOutsideAlerter = ({ ref, onClickOutside, exception } : Props) : void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node) && (exception.current && !exception.current.contains(event.target as Node))) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default useOutsideAlerter