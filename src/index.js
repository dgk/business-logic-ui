/** @flow **/
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router-dom'

import App from 'Features/App'
import history from 'Root/history'
import stores from 'Root/models/index'

const Root = document.getElementById('root')

if (Root) {
  ReactDOM.render(
    <Router history={history}>
      <Provider {...stores}>
        <App/>
      </Provider>
    </Router>,
    Root,
  )
}

