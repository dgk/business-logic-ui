/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'

import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'

import { getFullDate } from 'Utils/helpers'
import DirectoryCard from 'Core/DirectoryCard'

type TProps = {
  interfaceStore: {
    data: Array<{
      id: number,
      modification_time: string,
      title: string
    }>,
  },
}

const Interface = ({
                     interfaceStore: {
                       data = [],
                     },
                   }: TProps) => (
  <div className='ui relaxed divided list'>
    {
      data.map(({ id, modification_time, title }) => (
        <DirectoryCard key={id} title={title} date={getFullDate(modification_time)}/>
      ))
    }
  </div>
)

const composed: HOC<*, TProps> = compose(
  inject('interfaceStore'),
  lifecycle({
    componentDidMount() {
      this.props.interfaceStore.fetch()
    },
  }),
  observer,
)
export default composed(Interface)