import { types, flow, cast, Instance, SnapshotIn } from 'mobx-state-tree'
import { callApi } from '../utils/api'

export const InterfaceDataItemModel = types.model('InterfaceDataItem', {
  code: types.maybeNull(types.string),
  creation_time: types.string,
  environment: types.number,
  id: types.number,
  modification_time: types.string,
  title: types.string,
  url: types.string,
})

export interface InterfaceDataItem extends Instance<typeof InterfaceDataItemModel> {}
export interface InterfaceDataItemSnapshot extends SnapshotIn<typeof InterfaceDataItemModel> {}

export const InterfaceStoreModel = types
  .model('InterfaceStore', {
    isFetching: types.boolean,
    error: types.maybeNull(types.string),
    data: types.array(InterfaceDataItemModel),
  })
  .actions(self => ({
    setData(data: InterfaceDataItemSnapshot[]) {
      self.data = cast(data)
    },
    setFetching(fetchState: boolean) {
      self.isFetching = fetchState
    },
    setError(error: string | null) {
      self.error = error
    },
    fetch: flow(function* fetch() {
      try {
        yield callApi<{ results: InterfaceDataItemSnapshot[] }>({
          url: '/rest/program-interface',
          onRequest: () => self.setFetching(true),
          onSuccess: json => self.setData(json.results ?? []),
          onError: err => self.setError(err),
        })
      } finally {
        self.setFetching(false)
      }
    }),
  }))

export interface InterfaceStore extends Instance<typeof InterfaceStoreModel> {}
