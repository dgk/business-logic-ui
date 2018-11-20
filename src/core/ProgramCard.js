/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'

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
  <div className='item'>
    <i className='folder open middle aligned icon color_blue'/>
    <div className='content'>
      <Link to={location}>
        {title}
      </Link>
      <div className='description'/>
      <div className='description'>
        <b>Updated:</b> <i>{date}</i>
      </div>
    </div>
  </div>
)

export default ProgramCard