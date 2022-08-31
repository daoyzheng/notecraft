import { InputErrorMessage } from "../input/Input.styled"

interface IOption {
  id: string
  label: string
}

interface Props {
  label?: string
  options: IOption[]
  emptyText?: string
  className?: string
  placeholder?: string
  register: any
  errorMessage?: string | undefined
  autoFocus?: boolean
}
const Select = ({
  className,
  label,
  placeholder,
  options,
  emptyText='No options',
  register,
  errorMessage,
  autoFocus
}: Props) => {
  return (
    <div>
      <label htmlFor="select">{label}</label>
      <select
        className={`${className} focus:outline-none cursor-pointer w-full ${options.length === 0 ?'text-gray-400 focus:text-gray-500':''}`}
        {...register}
        autoFocus={autoFocus}
      >
        {options.length > 0 ?
          <>
            {placeholder && <option value="" disabled selected className="text-xs italic">{placeholder}</option>}
            {options.map(option =>
              <option
                className=""
                value={option.id}
              >{option.label}</option>)}
            </>
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