/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'

type TProps = {
  title: string,
  description: string,
  location: { pathname: string },
}

const VersionCard = ({
                       title,
                       location,
                       description,
                     }: TProps) => (
  <Item>
    <Icon name='file text'  color='blue'/>
    <Item.Content>
      <Link to={location}>
        {title}
      </Link>
      <Item.Description>
        {description}
      </Item.Description>
    </Item.Content>
  </Item>
)

export default VersionCard