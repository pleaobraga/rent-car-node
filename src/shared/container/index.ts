import { container } from "tsyringe"

import {
  IUsersRepository,
  UsersRepository,
} from "../../modules/accounts/repositories/users"
import {
  ICarsRepository,
  CarsRepository,
} from "../../modules/cars/repository/cars"
import {
  ICarsImagesRepository,
  CarsImagesRepository,
} from "../../modules/cars/repository/carsImages"
import {
  ICategoryRepository,
  CategoriesRepository,
} from "../../modules/cars/repository/categories"
import {
  ISpecificationsRepository,
  SpecificationsRepository,
} from "../../modules/cars/repository/specifications"

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)
