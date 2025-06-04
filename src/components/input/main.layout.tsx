import { ChangeEventHandler } from 'react'
import './style.scss'

export interface IInputText {
  id?: string
  className?: string
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onPresssEnter?: () => void

  // Test attribute
  testId?: string
}

export default function InputText(props: IInputText) {
  return (
    <input
      id={props.id}
      onKeyUp={ev =>
        ev.code === 'Enter' &&
        typeof props.onPresssEnter === 'function' &&
        props.onPresssEnter()
      }
      className={`afx-input ${props.className}`}
      disabled={props.disabled}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      data-testid={props.testId}
    />
  )
}
