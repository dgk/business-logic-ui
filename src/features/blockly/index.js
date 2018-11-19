/** @flow **/
import * as React from 'react'
import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'
import { inject, observer } from 'mobx-react'

type TProps = {
  props: {}
}

const Blockly = (props: TProps) => <div>Blockly</div>

const composed: HOC<*, {}> = compose(
  inject('router'),
  lifecycle({
    componentDidMount() {
      const {
        router,
        location: {
          pathname,
        },
      } = this.props
      router.setLocation(pathname)
    },
  }),
  observer,
)

export default composed(Blockly)
