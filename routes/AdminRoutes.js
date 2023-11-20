const express=require('express')
const {getMembersData,adminLogin} =require("../controllers/AdminController")
const router=express.Router()

router.get("/",getMembersData)
router.post("/",adminLogin)
// router.post("/adminSignUp",adminSignUp)
module.exports=router