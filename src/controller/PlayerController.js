const Player = require('../model/Player')

module.exports = {
  async index(req, res) {
    const players = await Player.find({})

    return res.status(200).json(players)
  },

  async store(req, res) {

    const { nickname } = req.body

    const playerExists = await Player.findOne({ nickname })

    if (playerExists) {
      return res.status(406).json({ error: `The player '${nickname}' already exists in our database` })
    }

    const player = await Player.create(req.body)

    return res.status(201).json(player)
  }
}

