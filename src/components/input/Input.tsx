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
        <div className="h-5 text-sm">
          <InputErrorMessage opacity={errorMessage ? 1 : 0} className="text-red-500">{errorMessage}</InputErrorMessage>
        </div>
      }
    </>
  )
}

export default Input