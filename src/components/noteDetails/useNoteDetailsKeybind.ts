import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { possibleNoteDetailsStates } from "../../constants/noteDetails"

interface Props {
  isActive: boolean
  isEditMode: boolean
  isEditingTitle: boolean
  numberOfElements: number
  originalTitle: string
  tags: string[]
  onTagsChange?: (tags: string[]) => void
  onBlur?: () => void
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  setIsEditingTitle: Dispatch<SetStateAction<boolean>>
  onTitleChange?: (title: string) => void
  onFinishEditTitle?: () => void
  onFinishEditTags?: () => void
  handleFinishAddingNewTag: () => void
  handleDeleteTag: (index: number) => void
  setCurrentNoteDetailsState: Dispatch<SetStateAction<possibleNoteDetailsStates>>
}

const useNoteDetailsKeybind = ({
  isActive,
  isEditMode,
  isEditingTitle,
  numberOfElements,
  tags,
  originalTitle,
  onBlur,
  setIsEditMode,
  setIsEditingTitle,
  onTitleChange,
  onFinishEditTitle,
  onFinishEditTags,
  handleFinishAddingNewTag,
  handleDeleteTag,
  onTagsChange,
  setCurrentNoteDetailsState
}: Props): [
  number, React.Dispatch<React.SetStateAction<number>>,
  number, React.Dispatch<React.SetStateAction<number>>,
  boolean, React.Dispatch<React.SetStateAction<boolean>>,
  boolean, React.Dispatch<React.SetStateAction<boolean>>,
  boolean, React.Dispatch<React.SetStateAction<boolean>>,
  string, React.Dispatch<React.SetStateAction<string>>
] => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0)
  const [currentTagIndex, setCurrentTagIndex] = useState<number>(0)
  const [isEditingTag, setIsEditingTag] = useState<boolean>(false)
  const [isEditingSingleTag, setIsEditingSingleTag] = useState<boolean>(false)
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false)
  const [newTag, setNewTag] = useState<string>('')
  const numberOfTags = useMemo(() => {
    return tags.length
  }, [tags])
  function handleKeyPress (e: KeyboardEvent) {
    if (isGlobalNavigating()) {
      console.log(e)
      switch(e.key.toLocaleLowerCase()) {
        case 'arrowdown':
        case 'j' : {
          if (currentElementIndex < numberOfElements - 1)
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
            setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTitle)
            e.preventDefault()
          }
          if (currentElementIndex === 1) {
            setCurrentTagIndex(0)
            setIsEditingTag(true)
          }
          if (currentElementIndex === numberOfElements - 1)
            setIsEditMode(true)
          break
        }
      }
    } else {
      if (isEditingTag) {
        if (!isEditingSingleTag && !isAddingTag) {
          switch(e.key.toLocaleLowerCase()) {
            case 'arrowright':
            case 'l': {
              if (currentTagIndex < numberOfTags)
                setCurrentTagIndex(currentTagIndex+1)
              if (currentTagIndex === numberOfTags)
                setCurrentTagIndex(0)
              break
            }
            case 'arrowleft':
            case 'h': {
              if (currentTagIndex > 0)
                setCurrentTagIndex(currentTagIndex-1)
              if (currentTagIndex === 0)
                setCurrentTagIndex(numberOfTags)
              break
            }
            case 'enter':
            case 'i': {
              if (numberOfTags === currentTagIndex) {
                setIsAddingTag(true)
              } else {
                setIsEditingSingleTag(true)
              }
              e.preventDefault()
              break
            }
            case 'x':
            case 'delete': {
              handleDeleteTag(currentTagIndex)
              break
            }
            case 'escape': {
              setIsEditingTag(false)
              setIsAddingTag(false)
              e.preventDefault()
              break
            }
          }
        } else {
          switch(e.key.toLocaleLowerCase()) {
            case 'enter':
            case 'escape': {
              if (!isAddingTag) {
                if (tags.includes('')) {
                  tags = tags.filter(tag => tag)
                  onTagsChange && onTagsChange(tags)
                }
                setIsEditingSingleTag(false)
                onFinishEditTags && onFinishEditTags()
              } else {
                handleFinishAddingNewTag()
                setIsAddingTag(false)
              }
              break
            }
          }
        }
      } else {
        switch(e.key.toLocaleLowerCase()) {
          case 'escape': {
            if (currentElementIndex === numberOfElements - 1)
              setIsEditMode && setIsEditMode(false)
            if (currentElementIndex === 1)
              setIsEditingTag(false)
            if (currentElementIndex === 0) {
              onTitleChange && onTitleChange(originalTitle)
              setIsEditingTitle && setIsEditingTitle(false)
            }
            setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
            break
          }
          case 'enter': {
            if (currentElementIndex === 0) {
              onFinishEditTitle && onFinishEditTitle()
              setIsEditingTitle && setIsEditingTitle(false)
              setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
            }
            break
          }
        }
      }
    }
  }
  function isGlobalNavigating () {
    return !isEditMode && !isEditingTitle && !isEditingTag
  }
  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [
    isActive,
    isEditMode,
    isEditingTitle,
    tags,
    originalTitle,
    newTag,
    currentElementIndex,
    currentTagIndex,
    isEditingTag,
    isAddingTag,
    isEditingSingleTag])
  return [
    currentElementIndex, setCurrentElementIndex,
    currentTagIndex, setCurrentTagIndex,
    isEditingTag, setIsEditingTag,
    isAddingTag, setIsAddingTag,
    isEditingSingleTag, setIsEditingSingleTag,
    newTag, setNewTag
  ]
}

export default useNoteDetailsKeybind