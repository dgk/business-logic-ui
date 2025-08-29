import { types, flow, cast, Instance, SnapshotIn } from 'mobx-state-tree'
import { callApi } from '../utils/api'

export const VersionDataItemModel = types.model('VersionDataItem', {
  id: types.number,
  creation_time: types.string,
  environment: types.maybeNull(types.number),
  modification_time: types.string,
  title: types.string,
  url: types.string,
  description: types.string,
  is_default: types.boolean,
  program: types.number,
})

export interface VersionDataItem extends Instance<typeof VersionDataItemModel> {}
export interface VersionDataItemSnapshot extends SnapshotIn<typeof VersionDataItemModel> {}

export const VersionStoreModel = types
  .model('VersionStore', {
    isFetching: types.boolean,
    error: types.maybeNull(types.string),
    data: types.array(VersionDataItemModel),
  })
  .actions(self => ({
    setData(data: VersionDataItemSnapshot[]) {
      self.data = cast(data)
    },
    setFetching(fetchState: boolean) {
      self.isFetching = fetchState
    },
    setError(error: string | null) {
      self.error = error
    },
    fetch: flow(function* fetch(programId: number) {
      try {
        yield callApi<{ results: VersionDataItemSnapshot[] }>({
          url: `/rest/program-version?program=${programId}`,
          onRequest: () => self.setFetching(true),
          onSuccess: json => self.setData(json.results ?? []),
          onError: err => self.setError(err),
        })
      } finally {
        self.setFetching(false)
      }
    }),
  }))

export interface VersionStore extends Instance<typeof VersionStoreModel> {}
