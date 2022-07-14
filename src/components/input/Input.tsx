import { useState } from "react"
import { InputErrorMessage } from "./Input.styled"

interface IInput {
  type?: string
  placeholder: string
  className?: string
  errorMessage?: string | undefined
  register: any
}

const Input = ({ className, register, errorMessage, ...rest }: IInput) => {
  return (
    <div className={className}>
      <input
        {...register}
        className="focus:outline-none py-2 bg-transparent w-full placeholder-gray-400 focus:placeholder-gray-400"
        {...rest}
      />
      <div className="h-5 text-sm">
        <InputErrorMessage opacity={errorMessage ? 1 : 0} className="text-amber-800">{errorMessage}</InputErrorMessage>
      </div>
    </div>
  )
}

export default Input