/** @flow **/
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'

import stores from 'Root/module/stores'
import App from 'Core/App'

const Root = document.getElementById('root')

if (Root) {
  ReactDOM.render(
    <HashRouter>
      <Provider {...stores}>
        <App/>
      </Provider>
    </HashRouter>,
    Root,
  )
}

