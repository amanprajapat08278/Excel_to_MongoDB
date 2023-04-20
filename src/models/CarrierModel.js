const mongoose = require("mongoose")

const carrierSchema = new mongoose.Schema({
    name: String //company_name
});


module.exports = mongoose.model('Carrier', carrierSchema);