import express from 'express'
const app = express()
import cors from 'cors'
import router from './controllers/router.js'

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/', router)

export default app