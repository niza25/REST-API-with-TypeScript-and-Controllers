import {Controller, Get} from 'routing-controllers'

// decorators, wirh @
@Controller()
export default class MainController {

    @Get("/hello")
    main() {
       return {
         hello: 'World'
       }
    }

}