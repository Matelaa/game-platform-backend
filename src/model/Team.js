const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },
  
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', TeamSchema)