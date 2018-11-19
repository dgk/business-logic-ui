import Interface from 'Models/Interface'
import Execution from 'Models/Execution'
import Router from 'Models/Router'

const stores = {}

Object.assign(stores, {
  interfaceStore: Interface,
  executionStore: Execution,
  router: Router,
})

export default stores
