import { KeyboardEvent } from "react"
import { InputErrorMessage } from "./Input.styled"

interface IInput {
  type?: string
  placeholder?: string
  className?: string
  errorMessage?: string | undefined
  register: any
  autoFocus?: boolean
  onKeyDown?: (e: KeyboardEvent) => void
}

const Input = ({ className, register, errorMessage, ...rest }: IInput) => {
  return (
    <>
      <input
        {...register}
        className={`${className}`}
        {...rest}
      />
      {
        rest.type !== 'checkbox' &&
        <InputErrorMessage opacity={errorMessage ? 1 : 0} className="text-red-500 text-sm mb-1">{errorMessage}</InputErrorMessage>
      }
    </>
  )
}

export default Input