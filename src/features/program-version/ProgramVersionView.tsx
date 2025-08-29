import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Segment, Header, List, Icon } from 'semantic-ui-react'

import { useProgramVersionStore } from '../../models'

const ProgramVersionView = observer(() => {
  const { versionId } = useParams()
  const programVersionStore = useProgramVersionStore()

  useEffect(() => {
    if (versionId) {
      programVersionStore.fetch(Number(versionId))
    }
  }, [versionId, programVersionStore])

  const { isFetching, error, data: version } = programVersionStore

  if (isFetching) {
    return <Segment>Loading...</Segment>
  }

  if (error) {
    return <Segment>Error: {error}</Segment>
  }

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
          <List.Header>XML</List.Header>
          <pre>{version.xml}</pre>
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
