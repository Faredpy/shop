const express = require('express')
require('dotenv').config()
const {Sequelize} = require('sequelize')
const sequelize = require('./models/config/config')
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/indexRouter')
const morgan = require('morgan')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3002
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(morgan('dev'))

// Middleware который работает с ошибкой, обязательное регистрируется в самом конце! (замыкающий и без next)
app.use(errorHandler)


const start = async () => {
    try {
        const seq = await  new Sequelize(sequelize.development)
        await seq.authenticate()
        await seq.sync()
        app.listen(PORT, () => {
            console.log(`Ok - ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()