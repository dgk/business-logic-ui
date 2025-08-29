import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Item } from 'semantic-ui-react'

import ProgramCard from '../../components/ProgramCard'
import { useRootStore } from '../../models'

const InterfaceList = observer(() => {
  const { interfaceStore } = useRootStore()

  useEffect(() => {
    interfaceStore.fetch()
  }, [interfaceStore])

  return (
    <Item.Group>
      {interfaceStore.data.map(item => (
        <ProgramCard
          key={item.id}
          date={item.modification_time}
          title={item.title}
          to={`/interface/${item.id}/program`}
        />
      ))}
    </Item.Group>
  )
})

export default InterfaceList
