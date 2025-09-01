import { forwardRef, useEffect, useImperativeHandle, useRef, useCallback } from 'react'
import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import 'blockly/msg/en'

export type BlocklyCanvasProps = {
  toolboxXml: string
  initialXml?: string
  onXmlChange?: (xml: string) => void
  defineCustomBlocks?: (BlocklyNS: typeof Blockly) => void
  className?: string
  readOnly?: boolean
}

export type BlocklyCanvasHandle = {
  getXml: () => string
  loadXml: (xmlText: string) => void
  clear: () => void
  setToolbox: (toolboxXml: string) => void
}

const parseXml = (text: string): Element => {
  const dom = new DOMParser().parseFromString(text, 'text/xml')
  if (dom.getElementsByTagName('parsererror').length) {
    throw new Error('Root element must be <xml>.')
  }
  const root = dom.documentElement
  if (!root || root.tagName !== 'xml') {
    throw new Error('Root element must be <xml>.')
  }
  return root
}

const BlocklyCanvas = forwardRef<BlocklyCanvasHandle, BlocklyCanvasProps>(
  ({ toolboxXml, initialXml, onXmlChange, defineCustomBlocks, className, readOnly }, ref) => {
    const divRef = useRef<HTMLDivElement>(null)
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
    const changeTimeout = useRef<number>()
    const onXmlChangeRef = useRef<typeof onXmlChange>
    onXmlChangeRef.current = onXmlChange

    const getXml = useCallback(() => {
      const workspace = workspaceRef.current
      if (!workspace) return ''
      const dom = Blockly.Xml.workspaceToDom(workspace)
      return new XMLSerializer().serializeToString(dom)
    }, [])

    const loadXml = useCallback((xmlText: string) => {
      const workspace = workspaceRef.current
      if (!workspace) return
      workspace.clear()
      const dom = parseXml(xmlText)
      Blockly.Xml.domToWorkspace(dom, workspace)
    }, [])

    const clear = useCallback(() => {
      workspaceRef.current?.clear()
    }, [])

    const setToolbox = useCallback((xmlText: string) => {
      const workspace = workspaceRef.current
      if (!workspace) return
      const dom = parseXml(xmlText)
      workspace.updateToolbox(dom)
    }, [])

    useImperativeHandle(ref, () => ({ getXml, loadXml, clear, setToolbox }), [getXml, loadXml, clear, setToolbox])

    useEffect(() => {
      if (!divRef.current) return

      if (defineCustomBlocks) {
        defineCustomBlocks(Blockly)
      }

      const toolboxDom = parseXml(toolboxXml)

      const workspace = Blockly.inject(divRef.current, {
        toolbox: toolboxDom,
        trashcan: true,
        zoom: { controls: true },
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        scrollbars: true,
        readOnly,
      })

      workspaceRef.current = workspace

      if (initialXml) {
        try {
          loadXml(initialXml)
        } catch (e) {
          console.warn(e)
        }
      }

      const handleResize = () => Blockly.svgResize(workspace)
      window.addEventListener('resize', handleResize)
      handleResize()

      const listener = () => {
        if (!onXmlChangeRef.current) return
        window.clearTimeout(changeTimeout.current)
        changeTimeout.current = window.setTimeout(() => {
          const xml = getXml()
          onXmlChangeRef.current && onXmlChangeRef.current(xml)
        }, 250)
      }

      workspace.addChangeListener(listener)

      return () => {
        window.removeEventListener('resize', handleResize)
        workspace.removeChangeListener(listener)
        workspace.dispose()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        ref={divRef}
        className={className}
        style={{ width: '100%', height: '400px' }}
      />
    )
  }
)

export default BlocklyCanvas
