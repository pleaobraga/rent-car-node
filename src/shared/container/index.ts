import { container } from "tsyringe"

import {
  ICategoryRepository,
  CategoriesRepository,
} from "../../modules/cars/repository/categories"
import {
  ISpecificationRepository,
  SpecificationRepository,
} from "../../modules/cars/repository/specifications"

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)
