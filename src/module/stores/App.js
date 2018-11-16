import {observable} from 'mobx'

class App {
  @observable error = null
  @observable isFetching = false
  @observable result = false
}

export default App