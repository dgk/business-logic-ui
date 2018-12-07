import { types } from 'mobx-state-tree'
import _ from 'lodash'

import { callApi } from 'Root/utils/callApi'
import routes from 'Config/routes'

const ExecutionDataItem = types.model({
  id: types.number,
  start_time: types.string,
  finish_time: types.string,
  program_version: types.number,
})

const ExecutionStore = types
  .model('Store', {
    isFetching: types.boolean,
    error: types.union(types.string, types.null),
    data: types.optional(types.array(ExecutionDataItem), []),
  })
  .actions(self => ({
    setData(data) {
      self.data = data
    },
    setFetching(fetchState) {
      self.isFetching = fetchState
    },
    setError(error) {
      self.error = error
    },
    fetch() {
      const url = `${routes.API_BACKUP}/business-logic/rest/execution`

      const body = {}

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      }

      callApi({
        url,
        config,
        onRequest: () => self.setFetching(true),
        onSuccess: (json) => self.setData(_.get(json, 'data.results', [])),
        onError: (error) => {
          self.setFetching(false)
          self.setError(error.toString())
        },
      })
    },
  }))

export default ExecutionStore.create({
  isFetching: false,
  error: null,
  data: [],
})
