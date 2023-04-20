const mongoose = require("mongoose")

const lobSchema = new mongoose.Schema({
    name: String, //catogary_name
});

module.exports = mongoose.model('LOB', lobSchema);