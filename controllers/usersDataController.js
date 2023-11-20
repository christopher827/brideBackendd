const usersData=require("../models/userDataModel")
const UserData=require("../models/userDataModel")
const validator=require("validator")

const createUserData=async(req,res)=>{
    const {fullname,email,age,technology}=req.body
    let emptyFields=[]
    if (!fullname) {
        emptyFields.push('fullname')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!age) {
        emptyFields.push('age')
    }
    if (!technology) {
        emptyFields.push('technology')
    }
    if (emptyFields.length>0) {
        return res.status(400).json({message:"please fill in all fields",emptyFields})
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({message:"Invalid email format"})
    }    
    const exists=await UserData.findOne({email}) //Checks if the email is in our database

    if (exists) {
        return res.status(400).json({message:"There's already a user with the specified email address"})
    }
    // const userCount=await UserData.countDocuments()
    // if (userCount>=20) {
    //     return res.status(400).json({message:"Event Filled"})
    // }
    try {
        const userData=await usersData.create({fullname,email,age,technology})
        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getUserData=async(req,res)=>{
    UserData.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
}
module.exports={
    createUserData,
    getUserData
}