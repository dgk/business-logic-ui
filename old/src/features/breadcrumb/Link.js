/** @flow **/
import * as React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

type TProps = {
  children: React.Node,
  active?: boolean
}

const Link = ({ children, active }: TProps) => (
  <Breadcrumb.Section active={active}>
    {children}
  </Breadcrumb.Section>
)

export default Link
