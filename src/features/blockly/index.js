/** @flow **/
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'

import Blockly from 'node-blockly/browser'
import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer'

import { toJS } from 'mobx'

type TProps = {
  blocklyStore: {
    isFetching: boolean,
    error: any,
    data: Array<{
      creation_time: string,
      description: string,
      environment: any,
      id: number,
      is_default: boolean,
      modification_time: string,
      program: number,
      title: string,
      xml: string,
    }>,
    fetch: Function,
  },
  match: {
    params: {
      id: string,
    },
  },
}

const helloWorld = {
  name: 'HelloWorld',
  category: 'Demo',
  block: {
    init: function () {
      this.jsonInit({
        message0: 'Hello %1',
        args0: [
          {
            type: 'field_input',
            name: 'NAME',
            check: 'String',
          },
        ],
        output: 'String',
        colour: 160,
        tooltip: 'Says Hello',
      })
    },
  },
  generator: (block) => {
    const message = `'${block.getFieldValue('NAME')}'` || '\'\''
    const code = `console.log('Hello ${message}')`
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  },
}

const BlocklyComponent = observer(({ blocklyStore: { data, fetch }, match: { params } }: TProps) => {
  React.useEffect(() => {
    fetch(_.get(params, 'id'))
  }, [fetch, params])

  return (
    <BlocklyDrawer
      tools={[helloWorld]}
      onChange={(code, workspace) => {
        console.log(code, workspace)
      }}
      workspaceXML={_.get(toJS(data)[0], 'xml', '')}
    >
      <Category name='Variables' custom='VARIABLE'/>
      <Category name='Values'>
        <Block type='math_number'/>
        <Block type='text'/>
      </Category>
    </BlocklyDrawer>
  )
})

export default inject('blocklyStore')(BlocklyComponent)