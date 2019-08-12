const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },

  nickname: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Player', PlayerSchema)