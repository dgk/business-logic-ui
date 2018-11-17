/** @flow **/
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import {
  compose,
  withProps,
  type HOC,
} from 'recompose'
import styled from 'styled-components'

import Link from 'Features/breadcrumb/Link'
import history from 'Root/history'

type TProps = {
  history: {
    location: {
      pathname: string,
    },
  },
  locationName: {
    '/interface': string,
    '/execution': string,
  }
}

const Wrapper = styled.div`
  padding-top: 15px;
  padding-left: 10px;
`

const Breadcrumb = ({
                      history: {
                        location: {
                          pathname,
                        },
                      },
                      locationName,
                    }: TProps) => (
  <Wrapper>
    <div className='ui breadcrumb'>
      <RouteLink to='/'>
        <Link active={pathname === '/'}> Home </Link>
      </RouteLink>
      <div className='divider'> /</div>
      {
        pathname && pathname.length > 1 && (
          <RouteLink to={pathname}>
            <Link active={pathname !== '/'}> {locationName[pathname]} </Link>
          </RouteLink>
        )
      }
    </div>
  </Wrapper>
)

const composed: HOC<*, {}> = compose(
  withProps({
    history,
    locationName: {
      '/interface': 'Interface',
      '/execution': 'Execution',
    },
  }),
)

export default composed(Breadcrumb)