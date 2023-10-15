/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
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
    fetch: Function,
  },
}

const Program = observer(({ programStore: { data = [], fetch } }: TProps) => {
  React.useEffect(() => {
    fetch()
  }, [fetch])

  return (
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
})

export default inject('programStore')(Program)