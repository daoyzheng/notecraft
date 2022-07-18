import { useEffect, useState } from "react"

interface Props {
  isActive: boolean
  isEditMode: boolean
  onBlur?: () => void
  numberOfElements: number
}

const useNoteDetailsKeybind = ({
  isActive,
  isEditMode,
  onBlur,
  numberOfElements
}: Props): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  function handleKeyPress (e: KeyboardEvent) {
    if (!isEditMode) {
      switch(e.key.toLocaleLowerCase()) {
        case 'arrowdown':
        case 'j' : {
          if (currentElementIndex < numberOfElements)
            setCurrentElementIndex(currentElementIndex+1)
          break
        }
        case 'arrowup':
        case 'k' : {
          if (currentElementIndex > 0)
            setCurrentElementIndex(currentElementIndex-1)
          break
        }
        case 'arrowleft':
        case 'backspace':
        case 'h': {
          if (!isEditMode) {
            onBlur && onBlur()
            setCurrentElementIndex(0)
          }
          break
        }
      }
    }
  }
  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isActive, currentElementIndex])
  return [currentElementIndex, setCurrentElementIndex]
}

export default useNoteDetailsKeybind