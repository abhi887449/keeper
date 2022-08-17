const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
      type: String,
      required: true
  },
  description: {
    type: String
  },
  archived: {
    type: String,
    default: "false"
  },
  alarm_date: {
    type: String,
    default: null
  },
  alarm_time: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('notes',NotesSchema);