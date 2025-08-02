import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  jest.spyOn(global, 'fetch')
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('initial load shows disabled button then displays a joke', async () => {
  const mockJoke = 'Test DevOps joke'
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ joke: mockJoke }),
  })

  render(<App />)

  // Immediately after render, the button should be in loading state (disabled)
  const button = screen.getByRole('button')
  expect(button).toBeDisabled()

  // Wait for the joke text to appear (this automatically wraps in act)
  await waitFor(() => {
    expect(screen.getByText(mockJoke)).toBeInTheDocument()
  })

  // After load completes, button is re-enabled
  expect(button).toBeEnabled()
  expect(button).toHaveTextContent(/get new joke/i)
})

test('clicking the button fetches and displays a new joke', async () => {
  // First fetch (on mount)
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ joke: 'First joke' }),
  })

  render(<App />)
  await screen.findByText('First joke')  // uses act under the hood

  // Mock second fetch (on click)
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ joke: 'Second joke' }),
  })

  const button = screen.getByRole('button', { name: /get new joke/i })
  fireEvent.click(button)

  // Wait for the new joke to appear
  await screen.findByText('Second joke')
})

test('shows an error message if fetch fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('network error'))

  render(<App />)

  // Wait for the error text to show up
  await screen.findByText(/failed to fetch joke/i)

  // Button should allow retry
  const button = screen.getByRole('button', { name: /get new joke/i })
  expect(button).toBeEnabled()
})

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
