import express from 'express'

import { categoriesRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(categoriesRoutes)

app.listen(3333, () => console.log('server is running!'))
