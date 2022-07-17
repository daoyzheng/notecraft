import { ChangeEvent } from "react"

interface Props {
  className?: string
  onChange?: (isChecked: boolean) => void
}
const Checkbox = ({ className, onChange } : Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked)
  }
  return (
    <input type="checkbox" className={`${className}`} onChange={handleOnChange}/>
  )
}

export default Checkbox