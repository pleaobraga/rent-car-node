import { CarsRepositoryInMemory } from "../../../repository/cars"
import { ListAvaiableCarsUseCase } from "./ListAvaiableCarsUseCase"

let listCarsUseCase: ListAvaiableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvaiableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all avaible cars", async () => {
    const carProps = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    }

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaible cars by brand", async () => {
    const carProps = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    }

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const cars = await listCarsUseCase.execute({
      brand: "Brand",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaible cars by name", async () => {
    const carProps = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    }

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const cars = await listCarsUseCase.execute({
      name: "Car 1",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaible cars by category_id", async () => {
    const carProps = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    }

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const cars = await listCarsUseCase.execute({
      category_id: "category_id",
    })

    expect(cars).toEqual([car])
  })

  it("should not be able to list cars when there's no one avaible ", async () => {
    const carProps = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    }

    const car = await carsRepositoryInMemory.create({
      ...carProps,
    })

    const cars = await listCarsUseCase.execute({
      category_id: "category_id",
    })

    expect(cars).toEqual([car])
  })
})
