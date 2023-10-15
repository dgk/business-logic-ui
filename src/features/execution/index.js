/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Item } from 'semantic-ui-react'

import ExecutionCard from 'Features/execution/ExecutionCard'
import { getFullDate, getDateDiff } from 'Utils/helpers'

type TProps = {
  executionStore: {
    data: Array<{
      id: number,
      start_time: string,
      title: string,
      finish_time: string
    }>,
    fetch: Function,
  },
}

const Execution = observer(({
                     executionStore: {
                       data = [],
                       fetch,
                     },
                   }: TProps) => {
  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Item.Group divided>
      {
        data.map(({
                    id,
                    start_time,
                    title,
                    finish_time,
                  }) => (
          <ExecutionCard
            key={id}
            title={id.toString()}
            date={getFullDate(start_time)}
            time={getDateDiff({ start: start_time, finish: finish_time }) / 1000}
          />
        ))
      }
    </Item.Group>
  );
});

export default inject('executionStore')(Execution);