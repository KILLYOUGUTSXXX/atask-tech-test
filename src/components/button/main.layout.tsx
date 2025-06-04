import './style.scss'

export interface IButton {
  id?: string
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children?: string

  // Test attribute
  testId?: string
}

export default function Button(props: IButton) {
  return (
    <button
      id={props.id}
      className={`afx-button ${props.className}`}
      disabled={props.disabled}
      onClick={ev => {
        ev.stopPropagation()
        return typeof props.onClick === 'function' && props.onClick()
      }}
      data-testid={props.testId}
    >
      {props.children}
    </button>
  )
}
