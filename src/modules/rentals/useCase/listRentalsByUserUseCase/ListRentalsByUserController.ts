import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase"

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user

      const listRentalsByUserUseCase = container.resolve(
        ListRentalsByUserUseCase
      )

      const rentals = await listRentalsByUserUseCase.execute(id)

      return response.json(rentals)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { ListRentalsByUserController }
