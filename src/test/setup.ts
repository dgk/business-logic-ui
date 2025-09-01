// Vitest setup: align globals with Undici so RequestInit validation passes
// React Router uses fetch/Request with AbortSignal; Undici validates instances strictly.
import { fetch as undiciFetch, Request as UndiciRequest, Response as UndiciResponse, Headers as UndiciHeaders, AbortController as UndiciAbortController, AbortSignal as UndiciAbortSignal, FormData as UndiciFormData, File as UndiciFile, Blob as UndiciBlob } from 'undici'

// Assign Undici implementations to globalThis
// @ts-ignore
globalThis.fetch = undiciFetch as any
// @ts-ignore
globalThis.Request = UndiciRequest as any
// @ts-ignore
globalThis.Response = UndiciResponse as any
// @ts-ignore
globalThis.Headers = UndiciHeaders as any
// @ts-ignore
globalThis.AbortController = UndiciAbortController as any
// @ts-ignore
globalThis.AbortSignal = UndiciAbortSignal as any
// Optional, but keeps parity with browser-like env
// @ts-ignore
globalThis.FormData = UndiciFormData as any
// @ts-ignore
globalThis.File = UndiciFile as any
// @ts-ignore
globalThis.Blob = UndiciBlob as any

// Provide a Request wrapper that tolerates any signal in init by stripping it.
class RequestWrapper extends UndiciRequest {
  constructor(input: any, init?: any) {
    if (init && typeof init === 'object' && 'signal' in init) {
      const { signal, ...rest } = init as any
      super(input as any, rest as any)
      return
    }
    super(input as any, init as any)
  }
}
// Override globals with wrapper
// @ts-ignore
globalThis.Request = RequestWrapper as any

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.fetch = globalThis.fetch
  // @ts-ignore
  window.Request = globalThis.Request
  // @ts-ignore
  window.Response = globalThis.Response
  // @ts-ignore
  window.Headers = globalThis.Headers
  // @ts-ignore
  window.AbortController = globalThis.AbortController
  // @ts-ignore
  window.AbortSignal = globalThis.AbortSignal
  // @ts-ignore
  window.FormData = globalThis.FormData
  // @ts-ignore
  window.File = globalThis.File
  // @ts-ignore
  window.Blob = globalThis.Blob
}

