import { JsonController, Get, Param, Body, Post, HttpCode, Put, NotFoundError, Authorized } from 'routing-controllers'
import Page from './entity'



@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }

  @Get('/pages')
  async allPages() {
    const pages = await Page.find()
    return { pages }
  }

  @Authorized()
  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return Page.merge(page, update).save()
  }

  @Authorized()
  @Post('/pages')
  @HttpCode(201)
  createPage(
    // @Body means - it should get the JSON body of the request and put it into the page variable
    // Page will automatically look into this class for any validation rules
    // That works because routing-controllers integrates with class-validator out of the box, by default
    @Body() page: Page
  ) {
    return page.save()
  }

}