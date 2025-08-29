import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => (
  <Card.Group itemsPerRow={2} stackable>
    <Card as={Link} to='/interface'>
      <Card.Content>
        <Card.Header>
          <Icon name='folder open' /> Interfaces
        </Card.Header>
        <Card.Description>List of program interfaces.</Card.Description>
      </Card.Content>
    </Card>
    <Card as={Link} to='/execution'>
      <Card.Content>
        <Card.Header>
          <Icon name='bolt' /> Execution
        </Card.Header>
        <Card.Description>List of calculation logs.</Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
)

export default HomePage
