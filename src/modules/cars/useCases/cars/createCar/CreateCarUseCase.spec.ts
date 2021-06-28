import { AppError } from "../../../../../shared/errors/AppErrors"
import { CarsRepositoryInMemory } from "../../../repository/cars/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to creat a new car", async () => {
    const car = {
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    }

    const newCar = await createCarUseCase.execute({
      ...car,
    })

    expect(newCar).toHaveProperty("id")
  })

  it("should not be able to creat a new car with same license plate", async () => {
    const car = {
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    }

    await createCarUseCase.execute({
      ...car,
    })

    await expect(
      createCarUseCase.execute({
        ...car,
      })
    ).rejects.toEqual(new AppError("Car already exists!", 403))
  })

  it("should not be able to creat a new car with avaiable true by default", async () => {
    const car = {
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    }

    const newCar = await createCarUseCase.execute({
      ...car,
    })

    expect(newCar.avaiable).toBe(true)
  })
})
