/** @flow **/
import * as React from 'react'
import { Fragment } from 'react'
import {
  compose,
  defaultProps,
  lifecycle,
  withHandlers,
  type HOC,
} from 'recompose'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'
import { Breadcrumb } from 'semantic-ui-react'

import history from 'Root/history'
import RouterLink from 'Features/breadcrumb/RouterLink'

type TProps = {
  props: {},
  initLocation: {},
  finallyLocation: {},
  router: {
    location: string,
  },
  getLocation: () => void,
  getNavigation: () => Array<string>,
  getCustomPath: (value: string) => string,
  Divider: React.StatelessFunctionalComponent<any>,
}

const Wrapper = styled.div`
    padding: 10px 15px 10px;
`

const BreadcrumbWrapper = ({
                      initLocation,
                      router: {
                        location,
                      },
                      getLocation,
                      finallyLocation,
                      getNavigation,
                      getCustomPath,
                      Divider,
                    }: TProps) => {
  getLocation()
  const navigation = getNavigation()
  const lastLocationPath = navigation[navigation.length - 1]

  const customPath = getCustomPath(lastLocationPath)
  if (customPath) {
    navigation.push(customPath)
  }

  return (
    <Wrapper>
      <Breadcrumb>
        <Fragment>
          <RouterLink link='/' active={!navigation.length}>
            Home
          </RouterLink>
          <Divider />
          {
            navigation.map((link) => {
              const active = (link === lastLocationPath && !customPath) || (link === customPath)
              const title = initLocation[link] || link
              const backLocation = location.split('/')
              const findIndex = backLocation.indexOf(link)

              const targetLink = backLocation.splice(1,findIndex).join('/')

              return (
                <Fragment key={link}>
                  <RouterLink link={`/${targetLink}`} active={active}>
                    {title}
                  </RouterLink>
                  <Divider />
                </Fragment>
              )
            })
          }
        </Fragment>
      </Breadcrumb>
    </Wrapper>
  )
}

const composed: HOC<*, {}> = compose(
  inject(
    'router',
  ),
  defaultProps({
    initLocation: {
      'program': 'Book',
      'version': 'Book view',
    },
    Divider: Breadcrumb.Divider
  }),
  withHandlers({
    getLocation: ({ router }) => () => {
      history.listen((location) => {
        localStorage.setItem('backLocation', location.pathname)
        router.setLocation(location.pathname)
      })
    },
    getNavigation: ({ router: { location } }) => () => (
      _.filter(location.split('/'), (string) => (
        string !== Boolean && isNaN(string)
      ))
    ),
    getCustomPath: ({
                      finallyLocation,
                      router: {
                        location,
                      },
                    }) => (lastLocationPath) => {
      const finallyElement = location.split('/')
      if (lastLocationPath && !isNaN(finallyElement[finallyElement.length - 1])) {
        return 'blockly'
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const backLocation = localStorage.getItem('backLocation') || '/'
      if (this.props.router.location !== backLocation) {
        this.props.router.setLocation(backLocation)
      }
    },
    componentWillUnmount() {
      localStorage.removeItem('backLocation')
    },
  }),
  observer,
)

export default composed(BreadcrumbWrapper)