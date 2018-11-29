/** @flow **/
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'
import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'

import ReactBlocklyComponent from 'Features/blocly-test'

type TProps = {
  props: {}
}

const Blockly = (props: TProps) => (
  <div>
    <div>Blockly</div>
    <div>
      <ReactBlocklyComponent/>
    </div>
  </div>
)

const composed: HOC<*, {}> = compose(
  inject(
    'blocklyStore',
  ),
  lifecycle({
    componentDidMount() {
      const { params } = this.props.match
      console.log('\n\n\nlol', params)
      this.props.blocklyStore.fetch(_.get(params, 'id'))
    },
  }),
  observer,
)
export default composed(Blockly)