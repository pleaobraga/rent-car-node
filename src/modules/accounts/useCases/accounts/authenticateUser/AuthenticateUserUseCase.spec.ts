import { AppError } from "../../../../../shared/errors/AppErrors"
import {
  ICreateUserDTO,
  UsersRepositoryInMemory,
} from "../../../repositories/users"
import { CreateUserUseCase } from "../../users/createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@gmail.com",
      password: "1234",
      name: "user test",
    }

    await createUserUseCase.execute(user)

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistence user", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user@gmail.com",
        password: "1234",
        name: "user test",
      }

      await authUserUseCase.execute({
        email: user.email,
        password: user.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user@gmail.com",
        password: "1234",
        name: "user test",
      }

      await createUserUseCase.execute(user)

      await authUserUseCase.execute({
        email: user.email,
        password: "23643",
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
