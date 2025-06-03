/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IQueryRequestParams {
  _page?: number
  _pageSize?: number
  q?: string
}

export type IGetStates<T extends {[P in string]: any}> = (
  modelName: string,
  extractor: (state: T) => Partial<T> | any
) => any

export type IUseActions<ACT extends Record<string, (...args: any[]) => any>> = <REF_ACTION extends ACT>(
  modelName: string
) => <T extends keyof REF_ACTION = keyof REF_ACTION>(
  action: T,
  execute: Parameters<REF_ACTION[T]> | [],
  useLoading?: boolean
) => Promise<void> | void

export type TModelFn<
  STATE extends {[P in string]: any},
  ACTION extends Record<string, (...args: any[]) => any>
> = (
  set: (partial: Partial<STATE>) => void,
  getStates: IGetStates<STATE>,
  useActions: IUseActions<ACTION>
) => {
  state: STATE
  actions: ACTION
}

export type TSubscriptionFn<
  STATE extends {[P in string]: any},
  ACTION extends Record<string, (...args: any[]) => any>
> = (
  getStates: IGetStates<STATE>,
  useActions: IUseActions<ACTION>
) => (props: { pathname: string }) => void

export interface IModelDefinitions<
  STATE extends {[P in string]: any},
  ACTION extends Record<string, (...args: any[]) => any>
> {
  name: string
  model: TModelFn<STATE, ACTION>
  subscriptions?: TSubscriptionFn<STATE, ACTION>
}

export interface IRegisterModelOptions {
  key?: string
  replace?: boolean
}
