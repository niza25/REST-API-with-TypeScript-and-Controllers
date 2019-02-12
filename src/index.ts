// src/index.ts
import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import PageController from './pages/controller'
import UserController from './users/controller'
import setupDb from './db'


const app = createKoaServer({
  controllers: [
    PageController,
    UserController
  ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))