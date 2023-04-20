const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob: Date,
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    agentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent"
    }
});

module.exports = mongoose.model('User', userSchema);