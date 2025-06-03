'use client'

import { useLynxModel } from '@afx/models/engine/registry.model'
import MainView from './main.layout'
import { PropsWithChildren } from 'react'

export default function IndexMain(props: PropsWithChildren): React.JSX.Element {
  return useLynxModel(
    () => <MainView {...props} />,
    () => []
  )
}
