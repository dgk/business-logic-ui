import { render } from '@testing-library/react'
import { createRef } from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

import BlocklyCanvas, { BlocklyCanvasHandle } from '../BlocklyCanvas'

beforeAll(() => {
  // jsdom lacks certain SVG and canvas APIs used by Blockly
  // @ts-ignore
  SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 })
  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = () => ({ measureText: () => ({ width: 0 }) })
})

describe('BlocklyCanvas', () => {
  it('exposes imperative methods', () => {
    const ref = createRef<BlocklyCanvasHandle>()
    const xml = '<xml><block type="math_number"></block></xml>'
    render(<BlocklyCanvas toolboxXml="<xml></xml>" initialXml={xml} ref={ref} />)
    expect(ref.current?.getXml()).toContain('math_number')
    ref.current?.clear()
    expect(ref.current?.getXml()).not.toContain('math_number')
    ref.current?.loadXml(xml)
    expect(ref.current?.getXml()).toContain('math_number')
  })

  it('calls onXmlChange when workspace changes', async () => {
    vi.useFakeTimers()
    const ref = createRef<BlocklyCanvasHandle>()
    const onXmlChange = vi.fn()
    render(<BlocklyCanvas toolboxXml="<xml></xml>" onXmlChange={onXmlChange} ref={ref} />)
    ref.current?.loadXml('<xml><block type="math_number"></block></xml>')
    await vi.runAllTimersAsync()
    expect(onXmlChange).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('throws on invalid XML', () => {
    expect(() => render(<BlocklyCanvas toolboxXml="<notxml></notxml>" />)).toThrow(
      'Root element must be <xml>.'
    )
  })
})

