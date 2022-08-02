import { HintInputContainer } from "./InputHint.styled"

interface Props {
  label: string
}
const InputHint = ({ label }: Props) => {
  return (
    <HintInputContainer className="text-zinc-300">
      {label}
    </HintInputContainer>
  )
}

export default InputHint