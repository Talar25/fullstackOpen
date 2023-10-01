import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateFrm from './CreateForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const mockHandleCreate = jest.fn()

  render(<CreateFrm handleCreate={mockHandleCreate} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form...')
  await user.type(inputAuthor, 'testing a form...')
  await user.type(inputUrl, 'testing a form...')
  await user.click(sendButton)

  expect(mockHandleCreate.mock.calls).toHaveLength(1)
  expect(mockHandleCreate.mock.calls[0][0].title).toBe('testing a form...')
  expect(mockHandleCreate.mock.calls[0][0].author).toBe('testing a form...')
  expect(mockHandleCreate.mock.calls[0][0].url).toBe('testing a form...')
})
