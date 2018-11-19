/** @flow **/
import * as React from 'react'
import { Fragment } from 'react'
import {
  compose,
  type HOC,
} from 'recompose'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'

import RouterLink from 'Features/breadcrumb/RouterLink'

type TProps = {
  router: {
    location: string,
  },
  props: {},
}

const Wrapper = styled.div`
  padding-top: 15px;
  padding-left: 10px;
`

//TODO роутинг на последней странице переходит неправильно
const Breadcrumb = ({
                      router: {
                        location,
                      },
                    }: TProps) => {
  const navigation = _.filter(location.split('/'), Boolean)
  const lastLocationPath = navigation[navigation.length - 1]
  return (
    <Wrapper>
      <div className='ui breadcrumb'>
        <Fragment>
          <RouterLink link='/' active={!navigation.length}>
            Home
          </RouterLink>
          <div className='divider'> /</div>
          {
            navigation.map((link) => (
              <Fragment key={link}>
                <RouterLink link={`/${link}`} active={link === lastLocationPath}>
                  {link}
                </RouterLink>
                <div className='divider'> /</div>
              </Fragment>
            ))
          }
        </Fragment>
      </div>
    </Wrapper>
  )
}

const composed: HOC<*, {}> = compose(
  inject(
    'router',
    'executionStore',
  ),
  observer,
)

export default composed(Breadcrumb)