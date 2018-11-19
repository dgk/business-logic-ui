import { types } from 'mobx-state-tree'
import _ from 'lodash'

import { callApi } from 'Root/utils/callApi'
import routes from 'Config/routes'

const ExecutionStore = types
  .model('Store', {
    location: types.string,
  })
  .actions(self => ({
    setLocation(location) {
      self.location = location
    },
  }))

export default ExecutionStore.create({
  location: '/'
})
