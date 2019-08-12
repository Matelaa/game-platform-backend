const Team = require('../model/Team')

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
    } else if (teamExists.players !== null) {
      return res.status(403).json({ error: 'This team has players associated with it, it is not possible to eliminate before removing all players.' })
    }

    const { name } = await Team.findByIdAndDelete(id)

    res.status(200).json({ success: `The team '${name}' was successfully deleted.` })
  }
}