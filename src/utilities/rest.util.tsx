const URL = process.env.ENDPOINT

export const RestConfig = {
  user: {
    main: `${URL}/search/users`,
    repo: `${URL}/users/:uname/repos`
  }
}
