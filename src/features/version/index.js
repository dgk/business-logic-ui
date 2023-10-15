/** @flow **/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Item } from 'semantic-ui-react'

import history from 'Root/history'
import VersionCard from 'Features/version/VersionCard'

type TProps = {
  versionStore: {
    data: Array<{
      id: number,
      title: string,
      description: string,
    }>,
  },
}

const Version = observer(({ versionStore: { data = [] } }: TProps) => {
  React.useEffect(() => {
    versionStore.fetch();
  }, [versionStore]);

  return (
    <Item.Group>
      {
        data.map(({ id, description, title }) => (
          <VersionCard
            key={id}
            title={title}
            description={description}
            location={{ pathname: `${history.location.pathname}/${id}` }}
          />
        ))
      }
    </Item.Group>
  );
});

export default inject('versionStore')(Version);