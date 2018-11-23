/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'

import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'

import history from 'Root/history'
import VersionCard from 'Features/version/VersionCard'

type TProps = {
  versionStore: {
    data: Array<{
      id: number,
      title: string,
      description: string,
    }>,
  },
}

const Version = ({
                   versionStore: {
                     data = [],
                   },
                 }: TProps) => (
  <div className='ui relaxed divided list'>
    {
      data.map(({ id, description, title }) => (
        <VersionCard
          key={id}
          title={title}
          description={description}
          location={{ pathname: `${history.location.pathname}/${id}` }}
        />
      ))
    }
  </div>
)

const composed: HOC<*, TProps> = compose(
  inject(
    'versionStore',
  ),
  lifecycle({
    componentDidMount() {
      this.props.versionStore.fetch()
    },
  }),
  observer,
)
export default composed(Version)