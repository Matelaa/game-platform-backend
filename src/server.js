require('dotenv').config()

const express = require('express')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== "production"

    this.routes()
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express