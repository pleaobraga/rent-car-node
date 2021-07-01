import { container } from "tsyringe"

import { DayjsDateProvider } from "./DayjsDateProvider"
import { IDateProvider } from "./IDateProvider"

export { DayjsDateProvider } from "./DayjsDateProvider"
export { IDateProvider } from "./IDateProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)
