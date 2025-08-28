/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'
import { Item } from 'semantic-ui-react'

import history from 'Root/history'
import { getFullDate } from 'Utils/helpers'
import ProgramCard from 'Core/ProgramCard'

type TProps = {
  programStore: {
    data: Array<{
      id: number,
      modification_time: string,
      title: string,
    }>,
  },
}

const Program = ({
                   programStore: {
                       data = [],
                     },
                   }: TProps) => (
  <Item.Group>
    {
      data.map(({ id, modification_time, title }) => (
        <ProgramCard
          key={id}
          title={title}
          date={getFullDate(modification_time)}
          location={{ pathname: `${history.location.pathname}/${id}/version` }}
        />
      ))
    }
  </Item.Group>
)

const composed: HOC<*, TProps> = compose(
  inject(
    'programStore',
  ),
  lifecycle({
    componentDidMount() {
      this.props.programStore.fetch()
    },
  }),
  observer,
)
export default composed(Program)