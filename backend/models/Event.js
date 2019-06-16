const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: String,
    name: String,
    description: String,
    score: Number,
    user: String

})

module.exports = mongoose.model('Event', eventSchema);