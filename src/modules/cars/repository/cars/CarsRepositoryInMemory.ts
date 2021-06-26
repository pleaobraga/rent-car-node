import { Car } from "../../infra/typeorm/entities"
import { ICarsRepository, ICreateCarDTO } from "./ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      name,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((c) => c.license_plate === license_plate)
  }
}

export { CarsRepositoryInMemory }
