import { NextFunction, Request, Response } from "express"
import { RateLimiterRedis } from "rate-limiter-flexible"
import redis from "redis"

import { AppError } from "../../../errors/AppErrors"

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 5,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    return response.status(429).json({ error: "Too many request" })
  }
}
