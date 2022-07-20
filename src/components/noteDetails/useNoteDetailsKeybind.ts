import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
  isActive: boolean
  isEditMode: boolean
  isEditingTitle: boolean
  numberOfElements: number
  onBlur?: () => void
  setIsEditMode?: Dispatch<SetStateAction<boolean>>
  setIsEditingTitle?: Dispatch<SetStateAction<boolean>>
  onFinishEditTitle?: () => void
}

const useNoteDetailsKeybind = ({
  isActive,
  isEditMode,
  isEditingTitle,
  numberOfElements,
  onBlur,
  setIsEditMode,
  setIsEditingTitle,
  onFinishEditTitle
}: Props): [
  number, React.Dispatch<React.SetStateAction<number>>,
  number, React.Dispatch<React.SetStateAction<number>>,
  boolean, React.Dispatch<React.SetStateAction<boolean>>,
  boolean, React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  const [currentTagIndex, setCurrentTagIndex] = useState<number>(0)
  const [isEditingTag, setIsEditingTag] = useState<boolean>(false)
  const [isEditingSingleTag, setIsEditingSingleTag] = useState<boolean>(false)
  function handleKeyPress (e: KeyboardEvent) {
    console.log(e)
    if (!isEditMode && !isEditingTitle) {
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
          if (currentElementIndex === 0) {
            setIsEditingTitle && setIsEditingTitle(true)
            e.preventDefault()
          }
          if (currentElementIndex === numberOfElements)
            setIsEditMode && setIsEditMode(true)
          break
        }
      }
    } else {
      switch(e.key.toLocaleLowerCase()) {
        case 'escape': {
          if (currentElementIndex === numberOfElements)
            setIsEditMode && setIsEditMode(false)
          if (currentElementIndex === 0) {
            onFinishEditTitle && onFinishEditTitle()
            setIsEditingTitle && setIsEditingTitle(false)
          }
          break
        }
        case 'enter': {
          if (currentElementIndex === 0) {
            onFinishEditTitle && onFinishEditTitle()
            setIsEditingTitle && setIsEditingTitle(false)
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
  }, [isActive, currentElementIndex, isEditMode, isEditingTitle])
  return [
    currentElementIndex, setCurrentElementIndex,
    currentTagIndex, setCurrentTagIndex,
    isEditingTag, setIsEditingTag,
    isEditingSingleTag, setIsEditingSingleTag
  ]
}

export default useNoteDetailsKeybind