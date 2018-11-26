/** @flow **/
import * as React from 'react'
import { Card, Icon } from 'semantic-ui-react'

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
  <Card>
    <Card.Content>
      <Card.Header>
        <Icon name={className}/>
        {title}
      </Card.Header>
      <Card.Meta/>
      <Card.Description>
        {children}
      </Card.Description>
    </Card.Content>
  </Card>
)

export default BusinessCard