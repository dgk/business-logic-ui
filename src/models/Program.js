import { types } from 'mobx-state-tree'
import _ from 'lodash'

import { callApi } from 'Root/utils/callApi'
import routes from 'Config/routes'

const ProgramDataItem = types.model({
  id: types.number,
  code: types.string,
  creation_time: types.string,
  environment: types.null,
  modification_time: types.string,
  program_interface: types.number,
  title: types.string,
  url: types.string,

})

const ProgramStore = types
  .model('Store', {
    isFetching: types.boolean,
    error: types.null,
    data: types.optional(types.array(ProgramDataItem), []),
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
      const url = `${routes.API_BACKUP}/business-logic/rest/program?program_interface=1`

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

export default ProgramStore.create({
  isFetching: false,
  error: null,
  data: [],
})
