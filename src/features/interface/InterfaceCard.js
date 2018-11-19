/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'

type TProps = {
  date: string,
  title: string
}

const InterfaceCard = ({ date, title }: TProps) => (
  <div className='item'>
    <i className='folder open middle aligned icon color_blue'/>
    <div className='content'>
      <Link to={{ pathname: `/interface/${title}` }}>
        {title}
      </Link>
      <div className='description'/>
      <div className='description'>
        <b>Updated:</b> <i>{date}</i>
      </div>
    </div>
  </div>
)

export default InterfaceCard