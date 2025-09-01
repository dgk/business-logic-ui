import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

import ProgramVersionView from '../ProgramVersionView'

beforeAll(() => {
  // jsdom lacks certain SVG and canvas APIs used by Blockly
  // @ts-ignore
  SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 })
  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = () => ({ measureText: () => ({ width: 0 }) })
})

vi.mock('../../../models', () => ({
  useProgramVersionStore: () => ({
    fetch: vi.fn(),
    isFetching: false,
    error: null,
    data: {
      id: 1,
      title: 'Version 1',
      description: 'Desc',
      xml: '<xml></xml>',
      is_default: false,
    },
  }),
}))

vi.mock('react-router-dom', () => ({
  useParams: () => ({ versionId: '1' }),
}))

describe('ProgramVersionView', () => {
  it('renders Blockly canvas', async () => {
    const { container } = render(<ProgramVersionView />)
    await waitFor(() => {
      const svg = container.querySelector('.blocklySvg') as SVGSVGElement
      expect(svg).toBeInTheDocument()
      const rootDiv = svg.parentElement?.parentElement as HTMLDivElement
      expect(rootDiv.style.height).toBe('400px')
    })
  })
})
