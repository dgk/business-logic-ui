import { types } from 'mobx-state-tree'
import _ from 'lodash'

import { callApi } from 'Root/utils/callApi'
import routes from 'Config/routes'

const InterfaceDataItem = types.model({
  code: types.union(types.string, types.null),
  creation_time: types.string,
  environment: types.number,
  id: types.number,
  modification_time: types.string,
  title: types.string,
  url: types.string,
})

const InterfaceStore = types
  .model('Store', {
    isFetching: types.boolean,
    error: types.null,
    data: types.optional(types.array(InterfaceDataItem), []),
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
      const url = `${routes.API_BACKUP}/business-logic/rest/program-interface`

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
          self.setError(error)
        },
      })
    },
  }))

export default InterfaceStore.create({
  isFetching: false,
  error: null,
  data: [],
})
