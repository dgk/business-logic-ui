import { types, flow, cast, Instance, SnapshotIn } from 'mobx-state-tree'
import { callApi } from '../utils/api'

export const ProgramVersionModel = types.model('ProgramVersion', {
  id: types.number,
  title: types.string,
  description: types.string,
  xml: types.maybeNull(types.string),
  creation_time: types.string,
  modification_time: types.string,
  environment: types.maybeNull(types.number),
  is_default: types.boolean,
  program: types.number,
  url: types.string,
})

export interface ProgramVersion extends Instance<typeof ProgramVersionModel> {}
export interface ProgramVersionSnapshot extends SnapshotIn<typeof ProgramVersionModel> {}

export const ProgramVersionStoreModel = types
  .model('ProgramVersionStore', {
    isFetching: types.boolean,
    error: types.maybeNull(types.string),
    data: types.maybeNull(ProgramVersionModel),
  })
  .actions(self => ({
    setData(data: ProgramVersionSnapshot | null) {
      // cast is used to ensure the data conforms to the model type
      self.data = data ? cast(data) : null
    },
    setFetching(fetchState: boolean) {
      self.isFetching = fetchState
    },
    setError(error: string | null) {
      self.error = error
    },
    fetch: flow(function* fetch(versionId: number) {
      try {
        yield callApi<ProgramVersionSnapshot>({
          url: `/rest/program-version/${versionId}`,
          onRequest: () => self.setFetching(true),
          onSuccess: json => self.setData(json),
          onError: err => self.setError(err),
        })
      } finally {
        self.setFetching(false)
      }
    }),
  }))

export interface ProgramVersionStore extends Instance<typeof ProgramVersionStoreModel> {}

