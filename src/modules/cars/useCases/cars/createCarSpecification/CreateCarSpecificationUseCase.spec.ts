import { AppError } from "../../../../../shared/errors/AppErrors"
import { CarsRepositoryInMemory } from "../../../repository/cars"
import { SpecificationsRepositoryInMemory } from "../../../repository/specifications"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Cas Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it("should be able to add a new specification to a car", async () => {
    const carProps = {
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    }

    const specification = await specificationsRepositoryInMemory.create({
      description: "test description",
      name: "test name",
    })

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const specifications_id = [specification.id]

    const newCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(newCar).toHaveProperty("specifications")
    expect(newCar.specifications).toEqual([specification])
  })

  it("should not be able to add a new specification to an non existence car ", async () => {
    const car_id = "1234"
    const specifications_id = ["123456"]

    expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("Car does not exists", 404))
  })
})
