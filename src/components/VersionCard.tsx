import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'

interface VersionCardProps {
  title: string
  description: string
  to: string
}

const VersionCard = ({ title, description, to }: VersionCardProps) => (
  <Item>
    <Icon name='file text' color='blue' />
    <Item.Content>
      <Link to={to}>{title}</Link>
      <Item.Description>{description}</Item.Description>
    </Item.Content>
  </Item>
)

export default VersionCard
