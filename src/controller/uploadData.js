const agentModel = require("../models/agentModel")
const carrierModel = require("../models/carrierModel")
const LOBModel = require("../models/LOBModel")
const policyModel = require("../models/policyModel")
const userAccountModel = require("../models/userAccountModel")
const userModel = require("../models/userModel")

const csv = require('csv-parser');
const fs = require("fs")



const upoladData = async (req, res) => {
    try {
        let result = []

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => {
                result.push(data)
            })
            .on('end', () => {

                let dataLength = result.length;
                if(dataLength==0){return res.status(400).send({status:false, message : "No data in the file"})}

                result.forEach(async (data, i) => {

                    // insert agent data

                    let agent = {
                        name: data.agent
                    }

                    let agentData = await agentModel.findOne(agent)

                    if (!agentData) {
                        agentData = await agentModel.create(agent)
                    }

                    // insert user data

                    let user = {
                        name: data.firstname,
                        email: data.email,
                        phone: data.phone,
                        dob: data.dob,
                        address: {
                            street: data.address,
                            city: data.city,
                            state: data.state,
                            pincode: data.zip
                        },
                        agentId: agentData._id
                    }

                    let userData = await userModel.create(user)


                    //insert carrier data

                    const carrier = {
                        name: data.company_name
                    }

                    let carrierData = await carrierModel.findOne(carrier)

                    if (!carrierData) {
                        carrierData = await carrierModel.create(carrier)
                    }


                    //insert lob data

                    let lob = {
                        name: data.category_name
                    }

                    let lobData = await LOBModel.findOne(lob)

                    if (!lobData) {
                        lobData = await LOBModel.create(lob)
                    }


                    //insert policy data

                    let policy = {
                        userId: userData._id,
                        lobId: lobData._id,
                        carrierId: carrierData._id,
                        policyNumber: data.policy_number,
                        startDate: data.policy_start_date,
                        endDate: data.policy_end_date,
                        policyType: data.policy_type,
                        policyMode: data.policy_mode
                    }

                    await policyModel.create(policy)


                    //insert user account data

                    let userAccount = {
                        userId: userData._id,
                        accountName: data.account_name,
                        accountType: data.account_type,
                        balance: data.premium_amount
                    }

                    await userAccountModel.create(userAccount)

                    if(i==dataLength-1){
                        return res.status(201).send("Data Inserted ")
                    }

                })
            });

    } catch (err) {
        res.status(500).send({status:false, message : err.message})
    }
}




module.exports = { upoladData }