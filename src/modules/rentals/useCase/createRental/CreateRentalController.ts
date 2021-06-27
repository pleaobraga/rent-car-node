import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateRentalUseCase } from "./CreateRentalUseCase"

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { car_id, expected_return_date } = request.body
      const { id } = request.user

      console.log("expected_return_date", expected_return_date)

      const createRentalUseCase = container.resolve(CreateRentalUseCase)

      const rental = await createRentalUseCase.execute({
        user_id: id,
        car_id,
        expected_return_date,
      })

      return response.status(201).json(rental)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { CreateRentalController }
