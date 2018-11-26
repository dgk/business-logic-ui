/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'

type TProps = {
  date: string,
  time: number,
  title: string,
}

const ExecutionCard = ({
                         date,
                         title,
                         time,
                       }: TProps) => (
  <Item>
    <Icon color='blue' size='middle' name='asterisk'/>
    <Item.Content>
      <Link to={{ pathname: `/execution/${title}` }}>
        {title}
      </Link>
      <Item.Description/>
      <Item.Description>
        <b>Launched: </b>
        <i>{date} </i>
        <b>run time: </b>
        <i>{time}</i>
      </Item.Description>
    </Item.Content>
  </Item>
)

export default ExecutionCard