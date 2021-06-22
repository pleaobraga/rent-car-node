import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { AppError } from "../errors/AppErrors"
import { UsersRepository } from "../modules/accounts/repositories/users"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  try {
    const [, token] = authHeader.split(" ")

    const { sub: user_id } = verify(token, "142578idqwjdjiu") as IPayload

    const userRepository = new UsersRepository()
    const user = await userRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists", 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch (e) {
    console.dir(e)

    throw new AppError("invalid token!", 401)
  }
}
