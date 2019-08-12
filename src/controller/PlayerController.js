const Player = require('../model/Player')
const Team = require('../model/Team')
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
  },

  async destroy(req, res) {
    const { id } = req.params

    const player = await Player.findById(id)

    if (!player) {
      return res.status(404).json({ error: 'This player does not exist in our database' })
    } else if (player.team) {
      const { name } = await Team.findById(player.team)
      return res.status(403).json({ error: `This player is associated with the '${name}', you cannot delete someone who has a team.` })
    }

    const { name } = await Player.findByIdAndDelete(id)

    res.json({ success: `The player '${name}' was successfully deleted.` })
  }
}

