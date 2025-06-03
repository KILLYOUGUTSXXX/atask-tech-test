/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModelDefinitions } from '@afx/interfaces/global.iface'
import {
  IGithubUser,
  IGithubRepositories
} from '@afx/interfaces/main/github.iface'
import * as service from '@afx/services/github.service'

export type IStateGithub = {
  listUsers: Array<IGithubUser>
  listRepositories: Array<IGithubRepositories>
  currentUser?: { id: number; username: string }
  currentSearch: string
}
export type IActionGithub = {
  onGetListUsers: (q: string) => void
  onGetListRepositories: (uname: string) => void
  updateState: (payload: Partial<IStateGithub>) => void
}

const GithubModel: IModelDefinitions<IStateGithub, IActionGithub> = {
  name: 'github',
  subscriptions:
    (_, useActions) =>
    ({ pathname }) => {
      if (pathname === '/github')
        useActions<IActionGithub>('github')('onGetListUsers', [''], true)
    },
  model: (put) => ({
    state: {
      currentSearch: '',
      listUsers: [],
      listRepositories: [],
      currentUser: undefined
    },
    actions: {
      async onGetListUsers(q) {
        try {
          const result = await service.getListUsers(q)
          put({ listUsers: result.items, currentSearch: q })
        } catch (er: any) {
          return er
        }
      },
      async onGetListRepositories(uname) {
        try {
          const result = await service.getUserRepositories(uname)
          put({
            listRepositories: result.map(a => ({
              description: a.description,
              forks_count: a.forks_count,
              id: a.id,
              name: a.name
            }))
          })
         } catch (er: any) {
          return er
        }
      },
      updateState(payload) {
        put({ ...payload })
      }
    }
  })
}

export default GithubModel
