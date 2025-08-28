import { makeAutoObservable } from 'mobx'

export class RouterStore {
  location = '/'

  constructor() {
    makeAutoObservable(this)
  }

  setLocation(location: string) {
    this.location = location
  }
}

export const routerStore = new RouterStore()
