import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, driver_license } = request.body
      const creatUserUseCase = container.resolve(CreateUserUseCase)

      await creatUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      })

      return response.status(201).send()
    } catch (err) {
      return response.status(404).json({ error: err.essage })
    }
  }
}

export { CreateUserController }
