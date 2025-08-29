import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import '@testing-library/jest-dom'

import { routes } from '../../router'

let mockRootStore: any
vi.mock('../../models', () => ({
  useInterfaceStore: () => mockRootStore.interfaceStore,
  useProgramStore: () => mockRootStore.programStore,
  useProgramVersionStore: () => mockRootStore.programVersionStore,
  useRootStore: () => mockRootStore,
}))

describe('Breadcrumbs', () => {
  beforeEach(() => {
    mockRootStore = {
      interfaceStore: {
        data: [],
        fetch: vi.fn(),
      },
      programStore: {
        data: [],
        fetch: vi.fn(),
      },
      programVersionStore: {
        data: null,
        fetch: vi.fn(),
      },
    }
  })

  it('shows breadcrumb for interface list', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/interface'] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Interfaces')).toBeInTheDocument()
  })

  it('shows breadcrumb for program list', () => {
    mockRootStore.interfaceStore.data = [
      { id: 1, title: 'Interface 1' },
    ]
    const router = createMemoryRouter(routes, { initialEntries: ['/interface/1/program'] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Interfaces')).toBeInTheDocument()
    expect(screen.getByText('Interface 1')).toBeInTheDocument()
  })

  it('shows breadcrumb for program version view', () => {
    mockRootStore.interfaceStore.data = [
      { id: 1, title: 'Interface 1' },
    ]
    mockRootStore.programStore.data = [
      { id: 2, title: 'Program A' },
    ]
    mockRootStore.programVersionStore.data = { id: 3, title: 'Version 1' }
    const router = createMemoryRouter(routes, { initialEntries: ['/interface/1/program/2/version/3'] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Interfaces')).toBeInTheDocument()
    expect(screen.getByText('Interface 1')).toBeInTheDocument()
    expect(screen.getByText('Program A')).toBeInTheDocument()
    expect(screen.getAllByText('Version 1')[0]).toBeInTheDocument()
  })

  it('shows breadcrumb for logs', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/execution'] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Logs')).toBeInTheDocument()
  })
})
