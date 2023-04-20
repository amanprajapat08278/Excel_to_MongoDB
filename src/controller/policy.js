const { isValidObjectId } = require("mongoose")
const userModel = require("../models/userModel")
const policyModel = require("../models/policyModel")



const createPolicy = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let userData = await userModel.findById({ _id: userId })
        if (!userData) { return res.status(404).send({ status: false, message: "User not found" }) }

        let data = req.body;

        let { lobId, carrierId, policyNumber, startDate, endDate, policyType, policyMode } = data;

        //Validation for lobId, carrierId, policyNumber, startDate, endDate, policyType and policyMode

        let result = await policyModel.create(data)

        return res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




const getPolicy = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let result = await policyModel.findOne({ userId: userId })

        if (!result) { return res.status(404).send({ status: false, message: "Policy not found" }) }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}





const updatePolicy = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let policyData = await policyModel.findOne({ userId: userId })
        if (!policyData) { return res.status(404).send({ status: false, message: "Policy not found" }) }

        let data = req.body;
        //data object include fields only which are required for update

        let result = await policyModel.findOneAndUpdate({ userId: userId }, data, { new: true })

        return res.status(200).send({ status: true, data: result })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}





const deletePolicy = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let policyData = await policyModel.findOne({ userId: userId })
        if (!policyData) { return res.status(404).send({ status: false, message: "Policy not found" }) }

        await policyModel.findOneAndDelete({ userId: userId })

        return res.status(200).send({ status: true, message: "Deleted" })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { createPolicy, getPolicy, updatePolicy, deletePolicy }