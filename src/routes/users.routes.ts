import { Router } from "express"
import multer from "multer"

import uploadConfig from "../config/upload"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"
import { CreateUserController } from "../modules/accounts/useCases/users/createUser"
import { UpdateAvatarController } from "../modules/accounts/useCases/users/updateUserAvatar"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateAvatarController = new UpdateAvatarController()

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
)

export { usersRoutes }
