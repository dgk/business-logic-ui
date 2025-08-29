import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

import InterfaceList from '../InterfaceList'

let mockRootStore: any
vi.mock('../../../models', () => ({
  useRootStore: () => mockRootStore,
}))

describe('InterfaceList', () => {
  beforeEach(() => {
    mockRootStore = {
      interfaceStore: {
        isFetching: false,
        error: null,
        data: [],
        fetch: vi.fn(),
      },
    }
  })

  it('shows error message when error is present', async () => {
    mockRootStore.interfaceStore.error = 'Network error'
    render(
      <MemoryRouter>
        <InterfaceList />
      </MemoryRouter>,
    )
    await waitFor(() => expect(mockRootStore.interfaceStore.fetch).toHaveBeenCalled())
    expect(screen.getByText('Network error')).toBeInTheDocument()
  })

  it('renders list when data is loaded', async () => {
    mockRootStore.interfaceStore.data = [
      {
        id: 1,
        title: 'Interface 1',
        modification_time: '2024-01-01',
      },
    ]
    render(
      <MemoryRouter>
        <InterfaceList />
      </MemoryRouter>,
    )
    await waitFor(() => expect(mockRootStore.interfaceStore.fetch).toHaveBeenCalled())
    expect(screen.getByText('Interface 1')).toBeInTheDocument()
  })
})

