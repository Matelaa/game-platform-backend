const Team = require('../model/Team')

module.exports = {
  async index(req, res) {
    const teams = await Team.find({})

    return res.status(200).json(teams)
  }
}