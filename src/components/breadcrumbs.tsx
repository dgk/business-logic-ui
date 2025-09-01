import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useInterfaceStore, useProgramStore, useProgramVersionStore } from '../models'

export const InterfaceCrumb: FC<{ interfaceId?: string }> = observer(({ interfaceId }) => {
  const interfaceStore = useInterfaceStore()

  useEffect(() => {
    if (interfaceId && !interfaceStore.data.find(i => i.id === Number(interfaceId))) {
      interfaceStore.fetch()
    }
  }, [interfaceId, interfaceStore])

  const item = interfaceStore.data.find(i => i.id === Number(interfaceId))
  return <>{item ? item.title : ''}</>
})

export const ProgramCrumb: FC<{ interfaceId?: string; programId?: string }> = observer(({ interfaceId, programId }) => {
  const programStore = useProgramStore()

  useEffect(() => {
    if (interfaceId && programId && !programStore.data.find(p => p.id === Number(programId))) {
      programStore.fetch(Number(interfaceId))
    }
  }, [interfaceId, programId, programStore])

  const item = programStore.data.find(p => p.id === Number(programId))
  return <>{item ? item.title : ''}</>
})

export const VersionCrumb: FC<{ versionId?: string }> = observer(({ versionId }) => {
  const programVersionStore = useProgramVersionStore()

  useEffect(() => {
    if (versionId && programVersionStore.data?.id !== Number(versionId)) {
      programVersionStore.fetch(Number(versionId))
    }
  }, [versionId, programVersionStore])

  return <>{programVersionStore.data?.title ?? ''}</>
})

