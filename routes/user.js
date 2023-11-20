const express=require('express')
// const {loginUser,signupUser,adminLogin,forgottenPassword,resetpassword}= require("../controllers/UserController")
const {Register}=require("../controllers/RegisterMembers")
const router=express.Router()

// router.post('/login',loginUser)
// router.post('/signup',signupUser)
// router.post('/forgottenpassword',forgottenPassword)
// router.post('/resetpassword',resetpassword)
// router.post('/adminlogin',adminLogin)
router.post("/registerMembers",Register)
module.exports=router