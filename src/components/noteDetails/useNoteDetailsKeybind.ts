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
}: Props): number => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  function handleKeyPress (e: KeyboardEvent) {
    if (!isEditMode) {
      switch(e.key.toLocaleLowerCase()) {
        case 'j' : {
          if (currentElementIndex < numberOfElements - 1)
            setCurrentElementIndex(currentElementIndex+1)
          break
        }
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
  return currentElementIndex
}

export default useNoteDetailsKeybind