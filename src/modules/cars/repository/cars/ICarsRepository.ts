import { Car } from "../../infra/typeorm/entities"

interface ICreateCarDTO {
  name: string
  description: string
  daily_rate: number
  lisence_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository, ICreateCarDTO }