const express = require("express")
const { default: mongoose } = require("mongoose")
const route = require("./route/route")
const multer = require("multer")
const dotenv = require("dotenv")
const app = express()

dotenv.config()

app.use(express.json())


app.use("/", route)

mongoose.connect(process.env.Database_URL, {
    useNewUrlParser: true
}).then(() => { console.log("Mongoose connected") })
    .catch((err) => console.log(err))

app.listen(process.env.PORT || 4000, () => {
    console.log("server run on " + (process.env.PORT || 4000))
})