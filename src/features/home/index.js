/** @flow **/
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Card } from 'semantic-ui-react'

import Link from 'Core/BusinessCard'

const LinkWrapper = styled.div`
  margin-right: 10px;
`

const Home = () => (
  <Card.Group>
    <LinkWrapper>
      <RouteLink to={{ pathname: '/interface' }}>
        <Link className='folder open icon' title='Interfaces'>
          List of program interfaces.
        </Link>
      </RouteLink>
    </LinkWrapper>
    <LinkWrapper>
      <RouteLink to={{ pathname: '/execution' }}>
        <Link className='lightning icon' title='Execution'>
          List of calculation logs.
        </Link>
      </RouteLink>
    </LinkWrapper>
  </Card.Group>
)

export default observer(Home)