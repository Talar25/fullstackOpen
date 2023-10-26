import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title: 'Test1',
    author: 'Testujacy autor1',
    url: 'urltest1',
    likes: 7,
    user: {
      username: 'Talar25',
    },
  }

  const mockHandleLike = jest.fn()
  const mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        onDelete={mockDeleteBlog}
        username={blog.user.username}
      />
    )
    expect(container).toHaveTextContent('Test1 Testujacy autor1view')
  })

  test('url and number of likes are shown when the button is clicked', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        onDelete={mockDeleteBlog}
        username={blog.user.username}
      />
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container).toHaveTextContent('urltest1')

    expect(container).toHaveTextContent('7')
  })

  test('clicking the button twice calls event handler twice', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        onDelete={mockDeleteBlog}
        username={blog.user.username}
      />
    )

    const user = userEvent.setup()
    const button = container.querySelector('.btn-like')
    await user.click(button)
    await user.click(button)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
