/** @flow **/
import * as React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
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

const BreadcrumbWrapper = inject('router')(observer(({
                      initLocation = {
                        'program': 'Book',
                        'version': 'Book view',
                      },
                      router: {
                        location,
                      },
                      finallyLocation,
                      Divider = Breadcrumb.Divider,
                    }: TProps) => {
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      localStorage.setItem('backLocation', location.pathname)
      router.setLocation(location.pathname)
    })

    const backLocation = localStorage.getItem('backLocation') || '/'
    if (router.location !== backLocation) {
      router.setLocation(backLocation)
    }

    return () => {
      unlisten();
      localStorage.removeItem('backLocation')
    }
  }, [])

  useEffect(() => {
    setNavigation(_.filter(location.split('/'), (string) => (
      string !== Boolean && isNaN(string)
    )))
  }, [location])

  const lastLocationPath = navigation[navigation.length - 1]

  const getCustomPath = (lastLocationPath) => {
    const finallyElement = location.split('/')
    if (lastLocationPath && !isNaN(finallyElement[finallyElement.length - 1])) {
      return 'blockly'
    }
  }

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
}))

export default BreadcrumbWrapper