import Interface from 'Models/Interface'
import Execution from 'Models/Execution'

const stores = {}

Object.assign(stores, {
  interfaceStore: Interface,
  executionStore: Execution,
})

export default stores
