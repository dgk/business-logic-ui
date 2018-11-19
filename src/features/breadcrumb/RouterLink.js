/** @flow **/
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Link from 'Features/breadcrumb/Link'

type TProps = {
  active?: boolean,
  children: React.Node | string,
  link: string,
}

const CustomLink = ({
                      active,
                      children,
                      link,
                    }: TProps) => (
  <RouterLink to={link}>
    <Link active={active}> {children} </Link>
  </RouterLink>
)

export default CustomLink