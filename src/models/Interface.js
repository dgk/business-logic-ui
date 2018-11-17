import { types } from 'mobx-state-tree'
import { callApi } from 'Root/utils/callApi'
import _ from 'lodash'

const InterfaceDataItem = types.model({
  code: types.string,
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
      const url = 'http://vzr.dgk.su/business-logic/rest/program-interface'

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
