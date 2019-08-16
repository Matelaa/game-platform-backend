const Team = require('../model/Team')
const Player = require('../model/Player')

module.exports = {
  async index(req, res) {
    const teams = await Team.find({})

    return res.status(200).json(teams)
  },

  async store(req, res) {
    const { name } = req.body

    const teamExists = await Team.findOne({ name })

    if (teamExists) {

      return res.status(406).json({ error: `The team '${name}' already exists in our database` })
    }

    const team = await Team.create(req.body)
    
    return res.status(201).json(team)
  },

  async destroy(req, res) {
    const { id } = req.params

    const teamExists = await Team.findById(id)

    if (!teamExists) {

      return res.status(404).json({ error: 'This team does not exist in our database.' })

    } else if (teamExists.players.length > 0) {

      while (teamExists.players.length > 0) {

        const removed = teamExists.players.pop()

        const player = await Player.findById(removed)

        player.team = null
        player.save()
      }

      const { name } = await Team.findByIdAndDelete(id)

      return res.status(200).json({ success: `The team '${name}' was successfully deleted.` })
    }

    const { name } = await Team.findByIdAndDelete(id)

    res.status(200).json({ success: `The team '${name}' was successfully deleted.` })
  }
}