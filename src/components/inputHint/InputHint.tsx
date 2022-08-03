import { HintInputContainer } from "./InputHint.styled"

interface Props {
  label?: string
  icon?: string
}
const InputHint = ({ label, icon }: Props) => {
  return (
    <HintInputContainer className="text-zinc-300 w-fit text-xs">
      {label ? label : (
        <i className="material-icons text-sm">{icon}</i>
      )}
    </HintInputContainer>
  )
}

export default InputHint