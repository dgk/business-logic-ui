import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'

interface ProgramCardProps {
  date: string
  title: string
  location: { pathname: string }
}

const ProgramCard = ({ date, title, location }: ProgramCardProps) => (
  <Item>
    <Icon name='folder open' color='blue' />
    <Item.Content>
      <Link to={location}>
        {title}
      </Link>
      <Item.Description />
      <Item.Description>
        <b>Updated:</b> <i>{date}</i>
      </Item.Description>
    </Item.Content>
  </Item>
)

export default ProgramCard
