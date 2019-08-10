require('dotenv').config()

const express = require('express')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== "production"
  }
}

module.exports = new App().express