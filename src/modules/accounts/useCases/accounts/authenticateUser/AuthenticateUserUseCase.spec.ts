import { DayjsDateProvider } from "../../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import { AppError } from "../../../../../shared/errors/AppErrors"
import { UsersRepositoryInMemory } from "../../../repositories/users"
import { UsersTokensRepositoryInMemory } from "../../../repositories/usersTokens/UsersTokensRepositoryInMemory"
import { CreateUserUseCase } from "../../users/createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider

const userProps = {
  driver_license: "00123",
  email: "user@gmail.com",
  password: "1234",
  name: "user test",
}

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute({ ...userProps })

    const result = await authUserUseCase.execute({
      email: userProps.email,
      password: userProps.password,
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistence user", async () => {
    await expect(
      authUserUseCase.execute({
        email: userProps.email,
        password: userProps.password,
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 400))
  })

  it("should not be able to authenticate incorrect password", async () => {
    await createUserUseCase.execute({ ...userProps })

    await expect(
      authUserUseCase.execute({
        email: userProps.email,
        password: "23643",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 400))
  })
})
