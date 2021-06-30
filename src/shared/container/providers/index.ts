import { container } from "tsyringe"

import { IDateProvider, DayjsDateProvider } from "./dateProvider"
import { EtherealMailProvider, IEmailProvider } from "./emailProvider"
import {
  IStorageProvider,
  LocalStorageProvider,
  S3StorageProvider,
} from "./storageProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IEmailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
)
