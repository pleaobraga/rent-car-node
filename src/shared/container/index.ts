import { container } from "tsyringe"

import {
  ICategoryRepository,
  CategoriesRepository,
} from "../../modules/cars/repository/categories"
import {
  ISpecificationRepository,
  SpecificationRepository,
} from "../../modules/cars/repository/specifications"

import {
  IUsersRepository,
  UsersRepository,
} from "../../modules/accounts/repositories/users"

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
