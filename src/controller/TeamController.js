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
  }
}