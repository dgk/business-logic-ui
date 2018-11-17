/** @flow **/
import * as React from 'react'

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
      <a className='header'>{title}</a>
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