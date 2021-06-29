import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { AppError } from "../../../errors/AppErrors"
import { UsersRepository } from "../../../../modules/accounts/repositories/users"
import { UsersTokensRepository } from "../../../../modules/accounts/repositories/usersTokens"
import auth from "../../../../config/auth"

interface IPayload {
  sub: string
}

// eslint-disable-next-line consistent-return
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const authHeader = request.headers.authorization

    const userTokensRepository = new UsersTokensRepository()

    if (!authHeader) {
      throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!user) {
      throw new AppError("User does not exists", 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch (e) {
    return response.status(e.statusCode || 400).json({ error: e.message })
  }
}
