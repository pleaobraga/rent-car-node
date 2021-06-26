import { NextFunction, Request, Response } from "express"

import { UsersRepository } from "../../../../modules/accounts/repositories/users"
import { AppError } from "../../../errors/AppErrors"

// eslint-disable-next-line consistent-return
export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const { id } = request.user

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(id)

    if (!user.isAdmin) {
      throw new AppError("user isn't an 'admin!")
    }

    next()
  } catch (e) {
    return response.status(e.statusCode || 400).json({ error: e.message })
  }
}
