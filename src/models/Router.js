import { types } from 'mobx-state-tree'

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
