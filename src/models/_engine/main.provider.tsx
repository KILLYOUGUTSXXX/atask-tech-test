/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetStates, IModelDefinitions } from '@afx/interfaces/global.iface'
import { StoreApi, UseBoundStore, create } from 'zustand'

const boundStore: { [modelName: string]: UseBoundStore<StoreApi<{ state: any, loadings?: string[] }>> } = {}

const getStates: IGetStates<{ [P in string]: any }> = (modelName, callbackState) => {
  const currentState =
    typeof boundStore[modelName] === 'function'
      ? boundStore[modelName].getState()?.state
      : {}
  return callbackState(currentState)
}

function useActions(
  modelName: string
): (
  action: string,
  execute: any[],
  useLoading?: boolean
) => Promise<void> | void {
  const { actions }: any =
    typeof boundStore[modelName] === 'function'
      ? boundStore[modelName].getState()
      : {}

  return async (
    action: string,
    execute: any[] = [],
    useLoading: boolean = false
  ) => {
    const loadingKey: string = `${modelName}/${action}`

    // Loading before action execution
    if (useLoading) {
      const loadings = boundStore[modelName].getState()?.loadings || []
      await boundStore[modelName].setState({
        loadings: [...loadings, loadingKey]
      })
    }

    // Execute action
    await actions[action](...execute)

    // Loading after action execution
    if (useLoading) {
      const loadings =
        boundStore[modelName].getState()?.loadings

      const index = loadings?.indexOf?.(loadingKey)
      if (typeof index === 'number' && index !== -1) {
        loadings?.splice?.(index, 1)
        await boundStore[modelName].setState({ loadings })
      }
    }
  }
}

export function registerModels<
  STATE extends { [P in string]: any },
  ACTION extends Record<string, (...args: any[]) => any>
>(
  models: () => IModelDefinitions<STATE, ACTION>[],
  listener: (model: string, subscriptions: any) => void
): void {
  const modelDefinitions = models()

  for (const modelDefinition of modelDefinitions) {
    const { name, model, subscriptions } = modelDefinition

    if (!boundStore[name]) {
      boundStore[name] = create((set: any) =>
        model(
          partial =>
            set((currentState: any) => ({
              state: { ...currentState.state, ...partial }
            })),
          getStates as any,
          useActions as any
        )
      )
    }

    if (typeof subscriptions === 'function') {
      listener(name, subscriptions(getStates as any, useActions as any))
    }
  }
}

export function useLynxStore<
  State,
  Action extends { [P: string]: (...args: any) => any }
>(
  model: string
): {
  state: State
  isLoading: (act: keyof Action) => boolean
  useActions: <T extends string = '???'>(
    act: keyof Action,
    execute: Parameters<Action[T]> | [],
    useLoading?: boolean
  ) => void
} {
  try {
    let store: any = boundStore[model]
    store = store((state: any) => state)
    // if (!store) throw new Error()
    return {
      state: store.state,
      isLoading(act: keyof Action) {
        const { loadings }: { loadings: Array<string> } = store
        return (loadings || []).indexOf(`${model}/${act as string}`) !== -1
      },
      async useActions<T extends string = '???'>(
        act: keyof Action,
        executes: Parameters<Action[T]> | [],
        useLoading: boolean = false
      ) {
        useActions(model)(act as string, executes, useLoading)
      }
    }
  } catch (er: any) {
    return { state: {}, actions: {} } as any
  }
}
