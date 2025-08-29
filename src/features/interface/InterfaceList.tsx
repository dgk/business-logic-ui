import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Segment, Loader, Message } from 'semantic-ui-react'

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
      {interfaceStore.isFetching && <Loader active />}
      {!interfaceStore.isFetching && interfaceStore.error && (
        <Message negative content={interfaceStore.error} />
      )}
      {!interfaceStore.isFetching && !interfaceStore.error && (
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
      )}
    </Segment>
  )
})

export default InterfaceList
