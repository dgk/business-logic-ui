import { describe, it, expect, vi } from 'vitest'
import { ProgramVersionStoreModel } from '../../../models/ProgramVersion'
import mockVersion from '../__mocks__/programVersion.json'

// Mock the API call used in ProgramVersionStore
vi.mock('../../../utils/api', () => ({
  callApi: ({ onRequest, onSuccess }: any) => {
    onRequest?.()
    onSuccess?.({ ...mockVersion, url: '/rest/program-version/1/' })
    return Promise.resolve()
  },
}))

describe('ProgramVersionStore', () => {
  it('fetches and stores program version data', async () => {
    const store = ProgramVersionStoreModel.create({
      isFetching: false,
      error: null,
      data: null,
    })

    await store.fetch(1)

    expect(store.isFetching).toBe(false)
    expect(store.error).toBeNull()
    expect(store.data?.id).toBe(mockVersion.id)
    expect(store.data?.title).toBe(mockVersion.title)
  })
})
