/** @flow **/
import * as React from 'react'
import cx from 'classnames'

type TProps = {
  children: React.Node,
  active?: boolean
}

const Link = ({ children, active }: TProps) => (
  <span className={cx('section', { active })}>
    {children}
  </span>
)

export default Link
