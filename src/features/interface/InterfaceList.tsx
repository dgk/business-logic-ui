import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'

import ProgramCard from '../../components/ProgramCard'
import { useRootStore } from '../../models'
import { getFullDate } from '../../utils/date'

const InterfaceList = observer(() => {
  const { interfaceStore } = useRootStore()

  useEffect(() => {
    interfaceStore.fetch()
  }, [interfaceStore])

  return (
    <Segment>
      <Item.Group divided>
        {interfaceStore.data.map(item => (
          <ProgramCard
            key={item.id}
            date={getFullDate(item.modification_time)}
            title={item.title}
            to={`/interface/${item.id}/program`}
          />
        ))}
      </Item.Group>
    </Segment>
  )
})

export default InterfaceList
