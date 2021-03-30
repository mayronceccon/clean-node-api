import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controlller: Controller

  constructor (controller: Controller) {
    this.controlller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controlller.handle(httpRequest)

    return httpResponse
  }
}
