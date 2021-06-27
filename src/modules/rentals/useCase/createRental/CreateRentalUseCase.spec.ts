import dayjs from "dayjs"

import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppErrors"
import { RentalsRepositoryInMemory } from "../../repository/rentals"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

describe("Create Rental", () => {
  const oneDayAfter = dayjs().add(1, "days").toDate()

  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider
    )
  })

  it("should be able to create a new rental", async () => {
    const rentalProps = {
      user_id: "12344",
      car_id: "12344",
      expected_return_date: oneDayAfter,
    }

    const rental = await createRentalUseCase.execute({ ...rentalProps })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if the user still has renting", async () => {
    expect(async () => {
      const rentalProps = {
        user_id: "12344",
        car_id: "12344",
        expected_return_date: oneDayAfter,
      }

      await createRentalUseCase.execute({ ...rentalProps })

      const rentalProps2 = {
        user_id: "12344",
        car_id: "123444",
        expected_return_date: oneDayAfter,
      }

      await createRentalUseCase.execute({ ...rentalProps2 })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental if the car still is in using", async () => {
    expect(async () => {
      const rentalProps = {
        user_id: "12344",
        car_id: "12344",
        expected_return_date: oneDayAfter,
      }

      await createRentalUseCase.execute({ ...rentalProps })

      const rentalProps2 = {
        user_id: "12344s",
        car_id: "12344",
        expected_return_date: oneDayAfter,
      }

      await createRentalUseCase.execute({ ...rentalProps2 })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const rentalProps = {
        user_id: "12344",
        car_id: "12344",
        expected_return_date: dayjs().toDate(),
      }

      await createRentalUseCase.execute({ ...rentalProps })
    }).rejects.toBeInstanceOf(AppError)
  })
})
