import { RefObject, useCallback } from "react"
import Dialog from "../dialog/Dialog"

interface Props {
  onBlur: () => void
  blurException: RefObject<Element>
}
const NewNotebookForm = ({ onBlur, blurException }: Props) => {
  const handleDialogBlur = useCallback(() => {
    onBlur()
  },[onBlur])
  return (
    <Dialog onBlur={handleDialogBlur} exception={blurException} className="absolute right-0 top-5">
      <div className="bg-white rounded text-black p-2 h-fit" >
      </div>
    </Dialog>
  )
}

export default NewNotebookForm