import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'

import ProgramCard from '../../components/ProgramCard'
import { useProgramStore } from '../../models'
import { getFullDate } from '../../utils/date'

const ProgramList = observer(() => {
  const { interfaceId } = useParams()
  const programStore = useProgramStore()

  useEffect(() => {
    if (interfaceId) {
      programStore.fetch(Number(interfaceId))
    }
  }, [interfaceId, programStore])

  return (
    <Segment>
      <Item.Group divided>
        {programStore.data.map(item => (
          <ProgramCard
            key={item.id}
            date={getFullDate(item.modification_time)}
            title={item.title}
            to={`/interface/${interfaceId}/program/${item.id}/version`}
          />
        ))}
      </Item.Group>
    </Segment>
  )
})

export default ProgramList

