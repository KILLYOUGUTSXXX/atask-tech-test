import './style.scss'

export interface IButton {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children?: string
}

export default function Button(props: IButton) {
  return (
    <button
      className="afx-button"
      disabled={props.disabled}
      onClick={ev => {
        ev.stopPropagation()
        return typeof props.onClick === 'function' && props.onClick()
      }}
    >
      {props.children}
    </button>
  )
}
