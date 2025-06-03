/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

import { useLynxModel } from '@afx/models/engine/registry.model'
import GithubViewView from './main.layout'
import { PropsWithChildren } from 'react'

export default function IndexGithubView(
  props: PropsWithChildren
): React.JSX.Element {
  return useLynxModel(
    () => <GithubViewView {...props} />,
    () => [require('@afx/models/github.model').default]
  )
}
