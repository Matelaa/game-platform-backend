const Player = require('../model/Player')
const Team = require('../model/Team')
module.exports = {
  async index(req, res) {
    const players = await Player.find({})

    return res.status(200).json(players)
  },

  async store(req, res) {

    const { nickname } = req.body
    const { team } = req.body

    const playerExists = await Player.findOne({ nickname })
    const teamExists = await Team.findOne({ name: team })

    if (playerExists) {

      return res.status(406).json({ error: `The player '${nickname}' already exists in our database` })

    } else if (team === undefined) {

      const player = await Player.create(req.body)
      return res.status(201).json(player)

    } else {

      if (teamExists) {
        
        const team = await Team.findById(teamExists._id)
        const player = await Player.create({ photo: req.body.photo,
                                             name: req.body.name,
                                             nickname: req.body.nickname,
                                             role: req.body.role,
                                             team: team })

        player.team = team._id

        team.players.push(player._id)
        await team.save()

        return res.status(201).json({ player,
                                      team })
                                      
      } else {
        return res.status(400).json({ error: `The team '${team}' doesnt exists.` })
      }
    }
  },

  async destroy(req, res) {
    const { id } = req.params

    const player = await Player.findById(id)

    if (!player) {
      return res.status(404).json({ error: 'This player does not exist in our database' })

    } else if (player.team) {

      const team = await Team.findById(player.team)

      player.team = null

      const index = team.players.indexOf(id)
      team.players.splice(index, 1)

      await Player.findByIdAndDelete(id)
      await team.save()

      return res.status(200).json({ success: `The player '${player.name}' was successfully deleted.` })
    }

    const { name } = await Player.findByIdAndDelete(id)

    return res.status(200).json({ success: `The player '${name}' was successfully deleted.` })
  }
}

