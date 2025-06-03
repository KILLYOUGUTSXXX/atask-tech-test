import {
  IGithubRepositories,
  IGithubUser
} from '@afx/interfaces/main/github.iface'
import request from '@afx/utilities/request.util'
import { RestConfig } from '@afx/utilities/rest.util'

export function getListUsers(q: string) {
  return request<{ total_count: number; items: Array<IGithubUser> }>({
    url: RestConfig.user.main,
    method: 'GET',
    data: {
      q: q !== '' ? q : 'a',
      per_page: 5
    }
  })
}

export function getUserRepositories(uname: string) {
  return request<Array<IGithubRepositories>>({
    url: RestConfig.user.repo.replace(':uname', uname),
    method: 'GET'
  })
}
