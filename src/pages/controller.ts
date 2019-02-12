import { JsonController, Get, Param } from 'routing-controllers'
import pagesById, { Page } from './data'
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
// this markes a method as endpoint
// in this case it responds to any GET /pages/:id
// request with :id being a variable parameter
    @Get('/pages/:id')
    getPage(
      // this decorator retrieves the ID parameter from the url
        @Param('id') id: number
    ): Page {
        return pagesById[id]
    }
}