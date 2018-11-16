/** @flow **/
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'

const Link = ({ children }) => (
  <span className='section'>
    {children}
  </span>
)

const Breadcrumb = () => (
  <div className='ui breadcrumb'>
    <RouteLink to='/'>
      <Link> Home </Link>
    </RouteLink>
    <div className='divider'> /</div>
    <RouteLink to='/interface'>
      <Link> Interface </Link>
    </RouteLink>
    <div className='divider'> /</div>
    <RouteLink to='/execution'>
      <Link> Execution </Link>
    </RouteLink>
  </div>
)

export default Breadcrumb