const mongoose=require("mongoose")
const userDataSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    dateOfJoining:{
        type:String,
    },
    maritalStatus:{
        type:String,
    },
    address:{
        type:String,
    },
    nearestBustop:{
        type:String,
    },
    cellUnit:{
        type:String,
    },
    member:{
        type:String,
    },
    department:{
        type:String,
    },
    prayergroup:{
        type:String,
    },
    fellowship:{
        type:String,
    },
    nextOfKin:{
        type:String,
    },
    nextOfKinAddress:{
        type:String,
    },
    nextOfKinRelationship:{
        type:String,
    },
    nextOfKinPhoneNumber:{
        type:Number,
    },
    avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
     },
    
})
//Specified the collection name(usersData) and the model definition
const dataModel=mongoose.model("users",userDataSchema)
module.exports=dataModel
