import { PropsWithChildren } from 'react'

export default function MainView(props: PropsWithChildren) {
  return <div className="px-4 py-6">{props.children}</div>
}
