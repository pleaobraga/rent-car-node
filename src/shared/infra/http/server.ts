import express from "express"
import swagger from "swagger-ui-express"

import "reflect-metadata"
import swaggerFile from "../../../swagger.json"
import createConnection from "../../database"
import "../../container"
import { router } from "./routes"

createConnection()
const app = express()

app.use(express.json())

app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile))

app.use(router)

app.listen(3333, () => console.log("server is running!"))
