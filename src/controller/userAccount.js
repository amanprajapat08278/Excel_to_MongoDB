const userAccountModel = require("../models/userAccountModel");
const userModel = require("../models/userModel")


const createAccount = async (req, res) => {
    try {
        let data = req.body

        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let userData = await userModel.findById({ _id: userId })

        if (!userData) { return res.status(404).send({ status: false, message: "User not found" }) }

        let { accountName, accountType, balance } = data;
        // validations for accountName,accountType and balance

        data.userId = userId

        let result = await userAccountModel.create(data)

        return res.status(201).send({ status: true, data: result })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getAccount = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let result = await userAccountModel.findOne({ userId: userId })

        if (!result) { return res.status(404).send({ status: false, message: "User account not found" }) }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}




const updateAccount = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let acoountData = await userAccountModel.findOne({ userId: userId })

        if (!acoountData) { return res.status(404).send({ status: false, message: "User account not found" }) }

        let data = req.body

        let { accountName, accountType, balance } = data;
        // validations for userId, accountName,accountType and balance

        //data object include fields only which are required for update

        let result = await userAccountModel.findOneAndUpdate({ userId: userId }, data, { new: true })

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}




const deleteAccount = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter a valid userId" }) }

        let accountData = await userAccountModel.findOne({ userId: userId })

        if (!accountData) { return res.status(404).send({ status: false, message: "User account not found" }) }

        await userAccountModel.findOneAndDelete({ userId: userId })

        return res.status(200).send({ status: true, message: "Deleted" })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}




module.exports = { createAccount, getAccount, updateAccount, deleteAccount }