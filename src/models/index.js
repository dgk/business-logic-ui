import Interface from 'Models/Interface'
import Execution from 'Models/Execution'
import Router from 'Models/Router'
import Program from 'Models/Program'
import Version from 'Models/Version'

const stores = {}

Object.assign(stores, {
  executionStore: Execution,
  interfaceStore: Interface,
  programStore: Program,
  router: Router,
  versionStore: Version,
})

export default stores
