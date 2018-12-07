import { types } from 'mobx-state-tree'
import _ from 'lodash'

import { callApi } from 'Root/utils/callApi'
import routes from 'Config/routes'

const BloclyData = types.model({
  creation_time: types.string,
  description: types.string,
  environment: types.null,
  id: types.number,
  is_default: types.boolean,
  modification_time: types.string,
  program: types.number,
  title: types.string,
  xml: types.string,
})

const BlocklyStore = types
  .model('Store', {
    isFetching: types.boolean,
    error: types.union(types.string, types.null),
    data: types.optional(types.array(BloclyData), []),
  })
  .actions(self => ({
    setData(data) {
      self.data = [data]
    },
    setFetching(fetchState) {
      self.isFetching = fetchState
    },
    setError(error) {
      self.error = error
    },
    fetch(id) {
      const url = `${routes.API_BACKUP}/business-logic/rest/program-version/${id}`

      const body = {}

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      }

      callApi({
        url,
        config,
        onRequest: () => self.setFetching(true),
        onSuccess: (json) => self.setData(_.get(json, 'data')),
        onError: (error) => {
          self.setFetching(false)
          self.setError(error.toString())
        },
      })
    },
  }))

export default BlocklyStore.create({
  isFetching: false,
  error: null,
  data: [],
})
