import { container } from "tsyringe"

import { IStorageProvider } from "./IStorageProvider"
import { LocalStorageProvider } from "./LocalStorageProvider"
import { S3StorageProvider } from "./S3StorageProvider"

export { IStorageProvider } from "./IStorageProvider"
export { LocalStorageProvider } from "./LocalStorageProvider"
export { S3StorageProvider } from "./S3StorageProvider"

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
)
