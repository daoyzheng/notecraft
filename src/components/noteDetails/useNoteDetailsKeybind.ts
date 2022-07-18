import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
  isActive: boolean
  isEditMode: boolean
  numberOfElements: number
  onBlur?: () => void
  setIsEditMode?: Dispatch<SetStateAction<boolean>>
}

const useNoteDetailsKeybind = ({
  isActive,
  isEditMode,
  numberOfElements,
  onBlur,
  setIsEditMode
}: Props): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  function handleKeyPress (e: KeyboardEvent) {
    console.log(e)
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
          onBlur && onBlur()
          setCurrentElementIndex(0)
          break
        }
        case 'enter':
        case 'i': {
          if (currentElementIndex === numberOfElements)
            setIsEditMode && setIsEditMode(true)
        }
      }
    } else {
      switch(e.key.toLocaleLowerCase()) {
        case 'escape': {
          if (currentElementIndex === numberOfElements)
            setIsEditMode && setIsEditMode(false)
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
  }, [isActive, currentElementIndex, isEditMode])
  return [currentElementIndex, setCurrentElementIndex]
}

export default useNoteDetailsKeybind