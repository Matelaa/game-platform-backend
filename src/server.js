require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== "production"

    this.database()
    this.routes()
  }

  routes () {
    this.express.use(require('./routes'))
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true
    })
  }
}

module.exports = new App().express