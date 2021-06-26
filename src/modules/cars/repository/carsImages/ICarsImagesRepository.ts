import { CarImage } from "../../infra/typeorm/entities/CarImage"

interface ICreateCarImageDTO {
  car_id: string
  image_name: string
}

interface ICarsImagesRepository {
  create({ image_name, car_id }: ICreateCarImageDTO): Promise<CarImage>
}

export { ICarsImagesRepository, ICreateCarImageDTO }
