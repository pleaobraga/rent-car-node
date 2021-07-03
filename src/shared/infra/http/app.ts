import cors from "cors"
import express from "express"
import swagger from "swagger-ui-express"
import "dotenv/config"

import "reflect-metadata"
import upload from "../../../config/upload"
import swaggerFile from "../../../swagger.json"
import createConnection from "../../database"
import { router } from "./routes"
import "../../container"

createConnection()
const app = express()

app.use(express.json())

app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile))

app.use(cors())
app.use(router)

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

export { app }
