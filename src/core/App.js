/** @flow **/
import * as React from 'react'
import { Fragment } from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Interface from 'Features/interface'
import Execution from 'Features/execution'
import Home from 'Features/home'
import Breadcrumb from 'Features/breadcrumb'

const App = () => (
  <Fragment>
    <Breadcrumb/>
      <Switch>
        <Route path="/" exact to="/" component={Home}/>
        <Route path="/interface" component={Interface}/>
        <Route path="/execution" component={Execution}/>
        <Redirect from="*" to="/"/>
      </Switch>
  </Fragment>
)

export default App
