import { createContext, useContext, ReactNode } from 'react'
import { useLocalObservable } from 'mobx-react-lite'

import { InterfaceStoreModel, InterfaceStore } from './Interface'
import { ProgramStoreModel, ProgramStore } from './Program'
import { VersionStoreModel, VersionStore } from './Version'
import { ProgramVersionStoreModel, ProgramVersionStore } from './ProgramVersion'

export interface RootStore {
  interfaceStore: InterfaceStore
  programStore: ProgramStore
  versionStore: VersionStore
  programVersionStore: ProgramVersionStore
}

const RootStoreContext = createContext<RootStore | null>(null)

export function RootStoreProvider({ children }: { children: ReactNode }) {
  const store = useLocalObservable<RootStore>(() => ({
    interfaceStore: InterfaceStoreModel.create({
      isFetching: false,
      error: null,
      data: [],
    }),
    programStore: ProgramStoreModel.create({
      isFetching: false,
      error: null,
      data: [],
    }),
    versionStore: VersionStoreModel.create({
      isFetching: false,
      error: null,
      data: [],
    }),
    programVersionStore: ProgramVersionStoreModel.create({
      isFetching: false,
      error: null,
      data: null,
    }),
  }))
  return (
    <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
  )
}

export function useRootStore(): RootStore {
  const store = useContext(RootStoreContext)
  if (!store) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }
  return store
}

export function useInterfaceStore(): InterfaceStore {
  return useRootStore().interfaceStore
}

export function useProgramStore(): ProgramStore {
  return useRootStore().programStore
}

export function useVersionStore(): VersionStore {
  return useRootStore().versionStore
}

export function useProgramVersionStore(): ProgramVersionStore {
  return useRootStore().programVersionStore
}
