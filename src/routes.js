const express = require('express')
const PlayerController = require('./controller/PlayerController')
const TeamController = require('./controller/TeamController')

const routes = express.Router()

// Team
routes.get('/teams', TeamController.index)
routes.post('/team', TeamController.store)

// Player
routes.get('/players', PlayerController.index)
routes.post('/player', PlayerController.store)

module.exports = routes