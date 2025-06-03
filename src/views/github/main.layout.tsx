/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect, useState } from 'react'
import './style.scss'
import InputText from '@afx/components/input/main.layout'
import Button from '@afx/components/button/main.layout'
import Accordion from '@afx/components/accordion/main.layout'
import UserRepositoryItem from './layouts/user-repository.layout'
import { useLynxStore } from '@afx/models/engine/main.provider'
import { IActionGithub, IStateGithub } from '@afx/models/github.model'
import { LoadingOutlined } from '@ant-design/icons'
import { IGithubUser } from '@afx/interfaces/main/github.iface'

export default function GithubView(_: PropsWithChildren) {
  const {
    state,
    isLoading,
    useActions: UseAction
  } = useLynxStore<IStateGithub, IActionGithub>('github')

  const LOADING_USERS = isLoading('onGetListUsers') || false
  const LOADING_REPOS = isLoading('onGetListRepositories') || false

  const [qSearch, setQSearch] = useState<string>('')
  const [finalSearch, setFinalSearch] = useState<string>('')

  const onSearch = () => {
    return UseAction<'onGetListUsers'>('onGetListUsers', [qSearch], true)
  }

  const onSetAccordion = (open: boolean, record: IGithubUser) => {
    let payload: { id: number; username: string } | undefined = undefined
    if (open) payload = { id: record.id, username: record.login }

    UseAction<'updateState'>(
      'updateState',
      [{ currentUser: payload, listRepositories: [] }],
      true
    )

    if (open)
      return UseAction<'onGetListRepositories'>(
        'onGetListRepositories',
        [record.login],
        true
      )
    return null
  }

  useEffect(() => {
    onSearch()
  }, [finalSearch])

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <InputText
          disabled={LOADING_REPOS || LOADING_USERS}
          onPresssEnter={() => setFinalSearch(qSearch)}
          onChange={ev => setQSearch(ev.target.value)}
        />
      </div>
      <div>
        <Button
          disabled={LOADING_REPOS || LOADING_USERS}
          onClick={() => setFinalSearch(qSearch)}
        >
          Search
        </Button>
      </div>
      <div>
        <p className="text-lg text-gray-500 font-[500]">
          Showing users for {`"${state.currentSearch}"`}
        </p>
      </div>
      {!LOADING_USERS ? (
        <div className="flex-col gap-y-2 overflow-y-auto">
          {state.listUsers.map(a => (
            <Accordion
              open={a.id === state.currentUser?.id}
              key={a.id}
              disabled={LOADING_REPOS}
              title={a.login}
              renderItem={record => <UserRepositoryItem data={record} />}
              loadingItem={LOADING_REPOS}
              items={state.listRepositories}
              onChange={op => onSetAccordion(op, a)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col text-center justify-center gap-y-4">
          <LoadingOutlined className="text-[72px] !text-blue-400" />
          <p className="font-semibold text-blue-400">Loading ...</p>
        </div>
      )}
    </div>
  )
}
