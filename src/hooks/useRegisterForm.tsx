import {
  DeepPartial,
  DeepRequired,
  FieldErrorsImpl,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue
} from "react-hook-form";

interface Props<T> {
  defaultValue?: DeepPartial<T>
}

function useRegisterForm<T>({ defaultValue }: Props<T>) : {
  register: UseFormRegister<T>,
  reset: UseFormReset<T>,
  handleSubmit: UseFormHandleSubmit<T>,
  setValue: UseFormSetValue<T>
  errors:FieldErrorsImpl<DeepRequired<T>>} {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldUseNativeValidation: false,
    defaultValues: defaultValue
  })
  return {
    register,
    reset,
    handleSubmit,
    setValue,
    errors
  }
}

export default useRegisterForm