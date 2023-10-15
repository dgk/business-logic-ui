/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Item } from 'semantic-ui-react'

import { getFullDate } from 'Utils/helpers'
import ProgramCard from 'Core/ProgramCard'

type TProps = {
  interfaceStore: {
    data: Array<{
      id: number,
      modification_time: string,
      title: string
    }>,
    fetch: Function,
  },
}

const Interface = observer(({ interfaceStore: { data = [], fetch } }: TProps) => {
  React.useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Item.Group divided>
      {
        data.map(({ id, modification_time, title }) => (
          <ProgramCard
            key={id}
            title={title}
            date={getFullDate(modification_time)}
            location={{ pathname: `/interface/${id}/program` }}/>
        ))
      }
    </Item.Group>
  )
})

export default inject('interfaceStore')(Interface)