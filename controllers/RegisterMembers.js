const express = require("express");
const router = express.Router();
const Members=require("../models/userDataModel")
const Admin=require("../models/AdminModel")
const validator=require("validator")
const nodemailer=require("nodemailer")
const cloudinary = require("cloudinary");

const jwt=require("jsonwebtoken")

router.post("/registerMembers",async(req,res)=>{

    try {
        const {fullname,email,phoneNumber,gender,dateOfBirth,dateOfJoining,maritalStatus,address,nearestBustop,cellUnit,member,department,prayergroup,fellowship,nextOfKin,nextOfKinAddress,nextOfKinMaritalStatus,nextOfKinPhoneNumber,avatar}=req.body;   
// if (!fullname || !email || !phoneNumber || !gender  || !dateOfBirth || !dateOfJoining || !maritalStatus || !address || !nearestBustop || !cellUnit || !member || !department || !prayerGroup || !fellowship || !nextOfKin || !nextOfKinAddress || !nextOfKinMaritalStatus || !nextOfKinPhoneNumber) {
//     return res.status(400).json({message:"All fields must be filled"})
// }
if (!validator.isEmail(email)) {
    return res.status(400).json({message:"Invalid email format"})
}
const existingEmail=await Members.findOne({email}) //Checks if the email is in our database
if (existingEmail) {
    return res.status(400).json({message:"Email already in use"})
}
const phoneNumberExists=await Members.findOne({phoneNumber})
if (phoneNumberExists) {
    return res.status(400).json({message:"Phone Number Already In Use"})
}
const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "bridemembers",
  });

    const user=await Members.create({fullname,email,phoneNumber,gender,dateOfBirth,dateOfJoining,maritalStatus,address,nearestBustop,cellUnit,member,department,prayergroup,fellowship,nextOfKin,nextOfKinAddress,nextOfKinMaritalStatus,nextOfKinPhoneNumber,      
        avatar: {
        public_id: myCloud.public_id,                  
        url: myCloud.secure_url,
      },
    })
    res.status(200).json({message:"Data Created Successfully"})

    } catch (error) {
          res.status(500).json({message:error.message})    
    }

})


const resetPassword=async(req,res)=>{
    const {id, token} = req.params
    const {password} = req.body
    const verifyToken=await jwt.verify(token,process.env.SECRET);
    if (!verifyToken) {
        return res.status(400).json({message:"Error with the token"})
    }
const verifyUserInDataBase = await Admin.findById(id);
if (!verifyUserInDataBase) {
  return res.status(400).json({ message: "User not in database" });
}
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({message:"Password not strong enough"})
    }
    
    try {
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
    const updatePassword=await User.findByIdAndUpdate({_id:id},{password:hash})
    res.status(200).json({message:"Password Reset Successful"})

    } catch (error) {
        res.status(500).json({message:error.message})

    }
}


module.exports = router;