import { Router } from "express"
import multer from "multer"

import uploadConfig from "../../../../config/upload"
import { CreateUserController } from "../../../../modules/accounts/useCases/users/createUser"
import { ProfileUserController } from "../../../../modules/accounts/useCases/users/profileUser"
import { UpdateAvatarController } from "../../../../modules/accounts/useCases/users/updateUserAvatar"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateAvatarController = new UpdateAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
)

export { usersRoutes }
