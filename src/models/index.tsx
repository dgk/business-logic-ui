import { createContext, useContext, ReactNode } from 'react'
import { useLocalObservable } from 'mobx-react-lite'

import { RouterStore } from './Router'

export interface RootStore {
  router: RouterStore
}

const RootStoreContext = createContext<RootStore | null>(null)

export function RootStoreProvider({ children }: { children: ReactNode }) {
  const store = useLocalObservable<RootStore>(() => ({
    router: new RouterStore(),
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
