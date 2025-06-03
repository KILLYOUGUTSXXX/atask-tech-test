/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { registerModels } from './main.provider'
import React, { JSX, PropsWithChildren, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { IModelDefinitions } from '@afx/interfaces/global.iface'

let globalPath: string | null = null
let indexModelSubscriptions: Array<string> = []

export function useLynxModel<T extends { [P in string]: any }>(
  Components: (props: PropsWithChildren) => JSX.Element,
  models: () => Array<IModelDefinitions<T, any>>,
  ...props: any
): React.JSX.Element {
  const pathname = usePathname()

  useMemo(() => {
    if (globalPath !== pathname) {
      globalPath = pathname
      indexModelSubscriptions = []
    }

    registerModels(models, (model, subscriptions) => {
      if (
        typeof subscriptions === 'function' &&
        indexModelSubscriptions.indexOf(model) === -1
      ) {
        indexModelSubscriptions.push(model)
        return subscriptions({ pathname })
      }
    })
  }, [pathname])

  return <Components {...props} />
}
