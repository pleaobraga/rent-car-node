import { Request, Response } from "express"

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase"

class ImportCategoryController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request
    await this.importCategoriesUseCase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }
