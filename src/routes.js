const express = require('express')
const PlayerController = require('./controller/PlayerController')
const TeamController = require('./controller/TeamController')
const PlayerTeamController = require('./controller/PlayerTeamController')

const routes = express.Router()

// Team
routes.get('/teams', TeamController.index)
routes.post('/team', TeamController.store)
routes.delete('/team/:id', TeamController.destroy)

// Player
routes.get('/players', PlayerController.index)
routes.post('/player', PlayerController.store)
routes.delete('/player/:id', PlayerController.destroy)

// PlayerTeam
routes.post('/player/:idPlayer/team/:idTeam', PlayerTeamController.store)

module.exports = routes