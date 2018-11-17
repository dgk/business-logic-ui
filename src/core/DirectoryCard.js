/** @flow **/
import * as React from 'react'

type TProps = {
  date: string,
  title: string
}

const DirectoryCard = ({ date, title }: TProps) => (
  <div className='item'>
    <i className='folder open middle aligned icon color_blue'/>
    <div className='content'>
      <a className='header'>{title}</a>
      <div className='description'/>
      <div className='description'>
        <b>Updated:</b> <i>{date}</i>
      </div>
    </div>
  </div>
)

export default DirectoryCard