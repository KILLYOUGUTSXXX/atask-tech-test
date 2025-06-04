import { fireEvent, render, screen } from '@testing-library/react'
import GithubView from '@afx/views/github/index.layout'

describe('Testing', () => {
  it('Check existing search input', async () => {
    render(<GithubView />)

    const inputEl = screen.getByTestId('search-input')
    fireEvent.change(inputEl, { target: { value: 'KILLYOUGUTS' } })

    expect(inputEl).toHaveValue('KILLYOUGUTS')
  })
})
