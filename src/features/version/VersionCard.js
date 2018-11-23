/** @flow **/
import * as React from 'react'
import { Link } from 'react-router-dom'

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
  <div className='item'>
    <i className='file text middle aligned icon color_blue'/>
    <div className='content'>
      <Link to={location}>
        {title}
      </Link>
      <div className='description'>
        {description}
      </div>
    </div>
  </div>
)

export default VersionCard