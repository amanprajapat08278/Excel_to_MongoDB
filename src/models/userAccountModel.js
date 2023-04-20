const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    accountName: String,
    accountType: String,
    balance: Number
});


module.exports = mongoose.model('Account', accountSchema);