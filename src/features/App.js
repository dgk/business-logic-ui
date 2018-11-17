/** @flow **/
import * as React from 'react'
import { Fragment } from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'

import Interface from 'Features/interface/index'
import Execution from 'Features/execution/index'
import Home from 'Features/home/index'
import Breadcrumb from 'Features/breadcrumb/index'

const Wrapper = styled.div`
  padding-left: 10px;
  padding-top: 15px;
`

const App = () => (
  <Fragment>
    <Breadcrumb/>
    <Wrapper>
      <Switch>
        <Route path="/" exact to="/" component={Home}/>
        <Route path="/interface" component={Interface}/>
        <Route path="/execution" component={Execution}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </Wrapper>
  </Fragment>
)

export default App
