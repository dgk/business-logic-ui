import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Segment, Header, List, Icon } from 'semantic-ui-react'

import { useVersionStore } from '../../models'

const ProgramVersionView = observer(() => {
  const { programId, versionId } = useParams()
  const versionStore = useVersionStore()

  useEffect(() => {
    if (programId && versionStore.data.length === 0) {
      versionStore.fetch(Number(programId))
    }
  }, [programId, versionStore])

  const version = versionStore.data.find(v => v.id === Number(versionId))

  if (!version) {
    return <Segment>Version not found</Segment>
  }

  return (
    <Segment>
      <Header as='h3'>{version.title}</Header>
      <List>
        <List.Item>
          <List.Header>Description</List.Header>
          {version.description}
        </List.Item>
        <List.Item>
          <List.Header>Is Default</List.Header>
          {version.is_default ? <Icon name='check' /> : null}
        </List.Item>
      </List>
    </Segment>
  )
})

export default ProgramVersionView
