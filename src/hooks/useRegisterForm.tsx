import {
  DeepPartial,
  DeepRequired,
  FieldErrorsImpl,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset
} from "react-hook-form";

interface Props<T> {
  defaultValue?: DeepPartial<T>
}

function useRegisterForm<T>({ defaultValue }: Props<T>) : [UseFormRegister<T>, UseFormReset<T>, UseFormHandleSubmit<T>, FieldErrorsImpl<DeepRequired<T>>] {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    reValidateMode: 'onBlur',
    shouldUseNativeValidation: false,
    defaultValues: defaultValue
  })
  return [register, reset, handleSubmit, errors]
}

export default useRegisterForm