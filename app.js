require('dotenv').config()
require('./src/database/mysql')
require('./src/helpers/prototype')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./src/swagger/swagger_output.json')
const cors = require('cors')

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const peopleRouter = require('./routes/people')
const profileRouter = require('./routes/profile')

const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/people', peopleRouter)
app.use('/profile', profileRouter)

module.exports = app
