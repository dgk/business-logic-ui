/** @flow **/
import * as React from 'react'
import { Fragment } from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'

import Interface from 'Features/interface'
import Execution from 'Features/execution'
import Home from 'Features/home'
import Breadcrumb from 'Features/breadcrumb'
import Blockly from 'Features/blockly'
import Program from 'Features/program'
import Version from 'Features/version'

const Wrapper = styled.div`
  padding-left: 10px;
  padding-top: 15px;
`

const App = () => (
  <Fragment>
    <Breadcrumb/>
    <Wrapper>
      <Switch>
        <Route path='/' exact to='/' component={Home}/>
        <Route path='/interface/:id/program/:id/version/:id' component={Blockly}/>
        <Route path='/interface/:id/program/:id/version' component={Version}/>
        <Route path='/interface/:id/program' component={Program}/>
        <Route path='/execution/:id' component={Blockly}/>
        <Route path='/interface/:id' component={Blockly}/>
        <Route path='/interface' component={Interface}/>
        <Route path='/execution' component={Execution}/>
        <Redirect from='*' to='/'/>
      </Switch>
    </Wrapper>
  </Fragment>
)

export default App
