import { Router } from "express"
import multer from "multer"

import uploadConfig from "../../../../config/upload"
import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/cars/createCarSpecification"
import { ListAvaiableCarsController } from "../../../../modules/cars/useCases/cars/listAvaiableCars"
import { UploadCarImageController } from "../../../../modules/cars/useCases/cars/uploadCarImage"
import { ensureAdmin } from "../middleware/endureAdmin"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const carsRoutes = Router()

const uploadCarImages = multer(uploadConfig)

const createCarController = new CreateCarController()
const lisAvaiableCarController = new ListAvaiableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImageController.handle
)

carsRoutes.get("/avaiable", lisAvaiableCarController.handle)

export { carsRoutes }
