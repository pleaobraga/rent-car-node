import { DayjsDateProvider } from "../../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import { EmailProviderInMemory } from "../../../../../shared/container/providers/emailProvider/EmailProviderInMemory"
import { AppError } from "../../../../../shared/errors/AppErrors"
import { UsersRepositoryInMemory } from "../../../repositories/users"
import { UsersTokensRepositoryInMemory } from "../../../repositories/usersTokens/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let emailProvider: EmailProviderInMemory

const userProps = {
  name: "user test",
  email: "user@gmail.com",
  driver_license: "00123",
  password: "1234",
}

describe("Send Forgot Password User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    emailProvider = new EmailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      emailProvider
    )
  })

  it.skip("should be able to send a forgot password mail to user", async () => {
    const sendEmail = spyOn(emailProvider, "sendMail")
    await usersRepositoryInMemory.create({ ...userProps })

    await sendForgotPasswordMailUseCase.execute(userProps.email)

    expect(sendEmail).toHaveBeenCalled()
  })

  it("should not be able to send a forgot password mail to an inexistent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute(userProps.email)
    ).rejects.toEqual(new AppError("User does not exists", 401))
  })

  it.skip("should be able to create am user token", async () => {
    const create = spyOn(usersTokensRepositoryInMemory, "create")
    await usersRepositoryInMemory.create({ ...userProps })

    await sendForgotPasswordMailUseCase.execute(userProps.email)

    expect(create).toHaveBeenCalled()
  })
})
