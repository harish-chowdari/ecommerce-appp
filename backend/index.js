const port = 4005

const express = require("express")
const app =express()
const mongoose = require("mongoose")

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://harish:LDPasAv1fBvS38al@cluster0.qgm68yy.mongodb.net/e-commerce")

const ope = require("./routes/routes")
app.use("/",ope)

const userRoutes = require("./routes/UserRoutes")
app.use("/",userRoutes)

app.listen(port,(error)=>{
    if(!error){
        console.log("server running in "+port)
    }
    else{
        console.log("error")
    }
})
