import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListAvaiableCarsUseCase } from "./ListAvaiableCarsUseCase"

class ListAvaiableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { brand, name, category_id } = request.query

      const listAvaiableCarsUseCase = container.resolve(ListAvaiableCarsUseCase)

      const cars = await listAvaiableCarsUseCase.execute({
        brand: brand as string,
        name: name as string,
        category_id: category_id as string,
      })

      return response.json(cars)
    } catch (e) {
      return response.status(e.statusCode || 500).json({ error: e.message })
    }
  }
}

export { ListAvaiableCarsController }
