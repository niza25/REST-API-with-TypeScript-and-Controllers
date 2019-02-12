import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import PageController from './pages/controller'
import UserController from './users/controller'
import LoginController from './logins/controller'
import { Action } from 'routing-controllers'
import setupDb from './db'
import { verify } from './jwt'


const app = createKoaServer({
  controllers: [
    PageController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization

    if (header && header.startsWith('Bearer ')) {
      //arr destruc to make sure we only catch the second part of header.split and assign it to token
      const [, token] = header.split(' ')
      // will transform any variable into a boolean
      return !!(token && verify(token))
    } else {
      return false
    }
  }
})

setupDb()
  .then(_ =>
    app.listen(process.env.PORT, 4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))