const express = require("express")
const multer = require("multer")
const router = express.Router()
const { upoladData } = require("../controller/uploadData")
const { createUser, getUser, getUserById, updateUser, deleteUser } = require("../controller/user")
const { createAccount, getAccount, updateAccount, deleteAccount } = require("../controller/userAccount")
const { createPolicy, getPolicy, updatePolicy, deletePolicy } = require("../controller/policy")

const upload = multer({ dest: 'uploads' });


// Upload cvs file API

router.post("/upload", upload.single('csv'), upoladData)


//User CURD APIs

router.post("/user", createUser)

router.get("/user", getUser)

router.get("/user/:userId", getUserById)

router.put("/user/:userId", updateUser)

router.delete("/user/:userId", deleteUser)



// User Account CURD APIs

router.post("/account/:userId", createAccount)

router.get("/account/:userId", createAccount)

router.put("/account/:userId", createAccount)

router.delete("/account/:userId", createAccount)


// Policy CURD APIs

router.post("/policy/:userId", createPolicy)

router.get("/policy/:userId", getPolicy)

router.put("/policy/:userId", updatePolicy)

router.delete("/policy/:userId", deletePolicy)


module.exports = router;