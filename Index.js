require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const cloudinary = require("cloudinary");
const connectDB=require("./db/database")
app.use(cors({
origin:["http://localhost:3000"],
credentials:true,
methods: ['GET', 'POST','PUT','DELETE'], // Specify the allowed HTTP methods
}))
app.use(express.json({ limit: '10mb' }));  
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  
const port = process.env.PORT || 3002;

const members=require("./controllers/RegisterMembers")
const admin=require("./controllers/AdminController")

app.use("/api/members",members)
app.use("/api/dashboard",admin)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})