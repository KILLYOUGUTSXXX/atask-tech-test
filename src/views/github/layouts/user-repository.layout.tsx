import { IGithubRepositories } from '@afx/interfaces/main/github.iface'
import { StarFilled as StarIcon } from '@ant-design/icons'

interface IUserRepositoryItem {
  data: IGithubRepositories
}

export default function UserRepositoryItem(props: IUserRepositoryItem) {
  return (
    <div className="flex flex-row justify-between gap-2">
      <div className="flex flex-col justify-start gap-0.5 text-lg">
        <p className="font-semibold">{props.data.name}</p>
        <p>{props.data.description || '-'}</p>
      </div>
      <div className="flex flex-row gap-1 justify-center items-center">
        <p className="text-[14px] font-semibold">
          {props.data.forks_count || 0}
        </p>
        <StarIcon />
      </div>
    </div>
  )
}
