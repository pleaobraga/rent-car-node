import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { specifications_id } = request.body

    try {
      const createCarSpecificationUseCase = container.resolve(
        CreateCarSpecificationUseCase
      )

      const car = await createCarSpecificationUseCase.execute({
        car_id: id,
        specifications_id,
      })

      return response.json(car)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { CreateCarSpecificationController }
