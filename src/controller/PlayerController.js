const Player = require('../model/Player')

module.exports = {
  async index(req, res) {
    const players = await Player.find({})

    return res.status(200).json(players)
  }
}

