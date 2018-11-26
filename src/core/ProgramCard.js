/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'

type TProps = {
  date: string,
  title: string,
  location: { pathname: string },
}

const ProgramCard = ({
                       date,
                       title,
                       location,
                     }: TProps) => (
  <Item>
    <Icon name='folder open' size='middle' color='blue'/>
    <Item.Content>
      <Link to={location}>
        {title}
      </Link>
      <Item.Description/>
      <Item.Description>
        <b>Updated:</b> <i>{date}</i>
      </Item.Description>
    </Item.Content>
  </Item>
)

export default ProgramCard