import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateCategoryUseCase } from "./CreateCategorUseCase"

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

      await createCategoryUseCase.execute({ name, description })

      return response.status(201).send()
    } catch (e) {
      return response.status(e.statusCode).json({ error: e.message })
    }
  }
}

export { CreateCategoryController }
