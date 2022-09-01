import { ChangeEvent } from "react"
import { InputErrorMessage } from "../input/Input.styled"

export interface IOption {
  id: number
  label: string
}

interface Props {
  label?: string
  options: IOption[]
  emptyText?: string
  className?: string
  register: any
  errorMessage?: string | undefined
  autoFocus?: boolean
}
const Select = ({
  className,
  label,
  options,
  emptyText='No options',
  register,
  errorMessage,
  autoFocus
}: Props) => {
  return (
    <div className={`${className} flex flex-col justify-start`}>
      <label htmlFor="select">{label}</label>
      <select
        className={`focus:outline-none cursor-pointer w-full border rounded p-1 ${options.length === 0 ?'text-gray-400 focus:text-gray-500':''}`}
        {...register}
        autoFocus={autoFocus}
        defaultValue=""
        id="select"
      >
        {options.length > 0 ?
          options.map(option =>
            <option
              key={option.id}
              className=""
              value={option.id}
            >{option.label}</option>)
          :
          <option className="text-xs italic">{emptyText}</option>
        }
      </select>
      <div className="h-5 text-sm">
        <InputErrorMessage opacity={errorMessage ? 1 : 0} className="text-red-500">{errorMessage}</InputErrorMessage>
      </div>
    </div>
  )
}

export default Select