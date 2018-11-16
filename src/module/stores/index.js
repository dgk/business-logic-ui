import App from 'Stores/App'

const stores = {}

Object.assign(stores, {
  app: new App(stores),
})


export default stores
