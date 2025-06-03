import { ChangeEventHandler } from 'react'
import './style.scss'

export interface IInputText {
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onPresssEnter?: () => void
}

export default function InputText(props: IInputText) {
  return (
    <input
      onKeyUp={ev =>
        ev.code === 'Enter' &&
        typeof props.onPresssEnter === 'function' &&
        props.onPresssEnter()
      }
      className="afx-input"
      disabled={props.disabled}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  )
}
