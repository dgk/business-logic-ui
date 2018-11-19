/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'

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
  <div className='item'>
    <i className='asterisk middle aligned icon color_blue'/>
    <div className='content'>
      <Link to={{ pathname: `/execution/${title}` }}>
        {title}
      </Link>
      <div className='description'/>
      <div className='description'>
        <b>Launched: </b>
        <i>{date} </i>
        <b>run time: </b>
        <i className='color_blue'>{time}</i>
      </div>
    </div>
  </div>
)

export default ExecutionCard