const userModel = require("../models/userModel")




const createUser = async (req, res) => {
    try {
        let data = req.body
        let { name, email, phone, dob, agentId, address } = data

        // validations for name, email, phone, dob, address(zip, city etc) agentId

        let result = await userModel.create(data)

        return res.status(201).send({ status: true, data: result })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}





const getUser = async (req, res) => {
    try {
        let result = await userModel.find()

        if (result.length == 0) { return res.status(404).send({ status: false, message: "Users not found" }) }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




const getUserById = async (req, res) => {
    try {
        let userId = req.params.userId
        //validation for userId

        let result = await userModel.findById({ _id: userId })

        if (!result) { return res.status(404).send({ status: false, message: "User not found" }) }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const updateUser = async (req, res) => {
    try {
        let userId = req.params.userId
        //validation for userId

        let userData = await userModel.findById({ _id: userId })

        if (!userData) { return res.status(404).send({ status: false, message: "User not found" }) }

        let data = req.body
        let { name, email, phone, dob, agentId, address } = data

        // validations for name, email, phone, dob, address(zip, city etc) agentId
        //data object include fields only which are required for update

        let result = await userModel.findByIdAndUpdate(userId, data, { new: true })

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




const deleteUser = async (req, res) => {
    try {
        let userId = req.params.userId
        //validation for userId

        let userData = await userModel.findById({ _id: userId })

        if (!userData) { return res.status(404).send({ status: false, message: "User not found" }) }

        await userModel.findByIdAndDelete(userId)

        return res.status(200).send({ status: true, message: "Deleted" })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { createUser, getUser, getUserById, updateUser, deleteUser }