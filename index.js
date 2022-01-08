const express = require('express')
require('dotenv').config()
const {Sequelize} = require('sequelize')
const sequelize = require('./models/config/config')


const PORT = process.env.PORT || 3002
const app = express()

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