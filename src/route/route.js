const express = require("express")
const multer = require("multer")
const router = express.Router()
const { upoladData, deleteAll } = require("../controller/uploadData")
const { createUser, getUser, getUserById, updateUser, deleteUser } = require("../controller/user")
const { createAccount, getAccount, updateAccount, deleteAccount } = require("../controller/userAccount")


const upload = multer({ dest: 'uploads' });

router.get("/hello", (req, res) => {
    res.send("hello")
})

router.post("/upload", upload.single('csv'), upoladData)

router.delete("/delete", deleteAll)



//User CURD APIs

router.post("/user", createUser)

router.get("/user", getUser)

router.get("/user/:userId", getUserById)

router.put("/user/:userId", updateUser)

router.delete("/user/:userId", deleteUser)



// User Account APIs

router.post("/account/:userId", createAccount)

router.get("/account/:userId", createAccount)

router.put("/account/:userId", createAccount)

router.delete("/account/:userId", createAccount)

module.exports = router;