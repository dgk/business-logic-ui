import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'

import VersionCard from '../../components/VersionCard'
import { useVersionStore } from '../../models'

const VersionList = observer(() => {
  const { interfaceId, programId } = useParams()
  const versionStore = useVersionStore()

  useEffect(() => {
    if (programId) {
      versionStore.fetch(Number(programId))
    }
  }, [programId, versionStore])

  return (
    <Segment>
      <Item.Group divided>
        {versionStore.data.map(item => (
          <VersionCard
            key={item.id}
            title={item.title}
            description={item.description}
            to={`/interface/${interfaceId}/program/${programId}/version/${item.id}`}
          />
        ))}
      </Item.Group>
    </Segment>
  )
})

export default VersionList
