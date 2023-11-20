const mongoose=require("mongoose")
//A schema/blueprint of the data that will/should be passed to the already created collection in mongoDB
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const UserModel=mongoose.model("users",userSchema)
module.exports=UserModel