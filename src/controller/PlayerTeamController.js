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
    }
    
    if (!player) {
      return res.status(404).json({ error: 'Player not exists.' })
    }

    if (player.team) {
      const playerHasTeam = await Team.findById(player.team)
      return res.status(406).json({ error: `This player already have a team, team: ${playerHasTeam.name}` })
    }
    
    if (team.players.length === 5) {
      return res.status(400).json({ error: `This team already have 5 players.` })
    }

    player.team = team._id
    team.players.push(player._id)

    await player.save()
    await team.save()

    return res.status(200).json({ player,
                                  team   })
  }
}