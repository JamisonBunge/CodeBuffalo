const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: String,
    name: String,
    score: Number,
    address: String

})

module.exports = mongoose.model('Event', eventSchema);