import { types, flow, cast, Instance, SnapshotIn } from 'mobx-state-tree'
import { callApi } from '../utils/api'

export const ProgramDataItemModel = types.model('ProgramDataItem', {
  id: types.number,
  code: types.string,
  creation_time: types.string,
  environment: types.maybeNull(types.number),
  modification_time: types.string,
  program_interface: types.number,
  title: types.string,
  url: types.string,
})

export interface ProgramDataItem extends Instance<typeof ProgramDataItemModel> {}
export interface ProgramDataItemSnapshot extends SnapshotIn<typeof ProgramDataItemModel> {}

export const ProgramStoreModel = types
  .model('ProgramStore', {
    isFetching: types.boolean,
    error: types.maybeNull(types.string),
    data: types.array(ProgramDataItemModel),
  })
  .actions(self => ({
    setData(data: ProgramDataItemSnapshot[]) {
      self.data = cast(data)
    },
    setFetching(fetchState: boolean) {
      self.isFetching = fetchState
    },
    setError(error: string | null) {
      self.error = error
    },
    fetch: flow(function* fetch(interfaceId: number) {
      try {
        yield callApi<{ results: ProgramDataItemSnapshot[] }>({
          url: `/rest/program?program_interface=${interfaceId}`,
          onRequest: () => self.setFetching(true),
          onSuccess: json => self.setData(json.results ?? []),
          onError: err => self.setError(err),
        })
      } finally {
        self.setFetching(false)
      }
    }),
  }))

export interface ProgramStore extends Instance<typeof ProgramStoreModel> {}

