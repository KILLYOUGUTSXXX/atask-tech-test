import { lazy } from 'react'

const GithubView = lazy(() => import('@afx/views/github/index.layout'))
export default function GithubLayout() {
  return <GithubView />
}
