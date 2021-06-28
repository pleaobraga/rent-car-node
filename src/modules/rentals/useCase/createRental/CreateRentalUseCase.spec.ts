import dayjs from "dayjs"

import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppErrors"
import { Car } from "../../../cars/infra/typeorm/entities"
import { CarsRepositoryInMemory } from "../../../cars/repository/cars"
import { RentalsRepositoryInMemory } from "../../repository/rentals"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

let car: Car
let rentalProps: {
  user_id: string
  car_id: string
  expected_return_date: Date
}

describe("Create Rental", () => {
  const oneDayAfter = dayjs().add(1, "days").toDate()

  beforeEach(async () => {
    dayjsProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    )

    const carProps = {
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
      id: "1234",
    }

    car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    rentalProps = {
      user_id: "12344",
      car_id: car.id,
      expected_return_date: oneDayAfter,
    }
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({ ...rentalProps })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if the user still has renting", async () => {
    await createRentalUseCase.execute({ ...rentalProps })

    const rentalProps2 = {
      user_id: "12344",
      car_id: car.id,
      expected_return_date: oneDayAfter,
    }

    await expect(
      createRentalUseCase.execute({ ...rentalProps2 })
    ).rejects.toEqual(new AppError("Car is unavailable!", 401))
  })

  it("should not be able to create a new rental if the car still is in using", async () => {
    await createRentalUseCase.execute({ ...rentalProps })

    const rentalProps2 = {
      user_id: "12344s",
      car_id: car.id,
      expected_return_date: oneDayAfter,
    }

    await expect(
      createRentalUseCase.execute({ ...rentalProps2 })
    ).rejects.toEqual(new AppError("Car is unavailable!", 401))
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        ...rentalProps,
        expected_return_date: new Date(),
      })
    ).rejects.toEqual(
      new AppError("The rental needs to have at least one day", 400)
    )
  })
})
