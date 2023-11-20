const mongoose=require("mongoose")
//A schema/blueprint of the data that will/should be passed to the already created collection in mongoDB
const adminSchema=new mongoose.Schema({
    email:String,
    password:String
})
const adminModel=mongoose.model("admin",adminSchema)
module.exports=adminModel