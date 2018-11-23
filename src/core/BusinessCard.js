/** @flow **/
import * as React from 'react'

type TProps = {
  children: React.Node,
  className: string,
  title: string
}

const BusinessCard = ({
                children,
                className,
                title,
              }: TProps) => (
  <div className='card' style={{ cursor: 'pointer', margin: 20 }}>
    <div className='content'>
      <div className='header'><i className={className}/>{title}</div>
      <div className='meta'/>
      <div className='description'>
        {children}
      </div>
    </div>
  </div>
)

export default BusinessCard