const mongoose = require("mongoose")

const policySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    lobId: mongoose.Schema.Types.ObjectId,
    carrierId: mongoose.Schema.Types.ObjectId,
    policyNumber: String,
    startDate: Date,
    endDate: Date,
    policyType:String,
    policyMode : String
});

module.exports = mongoose.model('Policy', policySchema);