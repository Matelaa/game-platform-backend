const Player = require('../model/Player')
const Team = require('../model/Team')

module.exports = {
  async store(req, res) {

    const idPlayer = req.params.idPlayer
    const idTeam = req.params.idTeam

    const player = await Player.findById(idPlayer)
    const team = await Team.findById(idTeam)

    if (!team) {
      return res.status(404).json({ error: 'Team not exists.' })
    } else if (!player) {
      return res.status(404).json({ error: 'Player not exists.' })
    }

    if (player.team) {
      const playerHasTeam = await Team.findById(player.team)
      console.log(playerHasTeam.name)
      return res.status(406).json({ error: `This player already have a team, team: ${playerHasTeam.name}` })
    }

    player.team = team._id
    team.players.push(player._id)

    await player.save()
    await team.save()

    return res.status(200).json({ player,
                                  team   })
  },

  async destroy(req, res) {

    const idPlayer = req.params.idPlayer
    const idTeam = req.params.idTeam

    const player = await Player.findById(idPlayer)
    const team = await Team.findById(idTeam)

    if (!team) {
      return res.status(404).json({ error: 'Team not exists.' })
    } else if (!player) {
      return res.status(404).json({ error: 'Player not exists.' })
    }

    if (!player.team) {
      return res.status(404).json({ error: `This player don't have a team` })
    }

    player.team = null

    const index = team.players.indexOf(idPlayer)
    team.players.splice(index, 1)

    await player.save()
    await team.save()
    
    return res.status(200).json({ player,
                                  team   })
  }
}